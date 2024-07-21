const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// MySQL Connection Configuration
const dbConfig = {
  host: 'localhost',
  user: 'PragalyaK',
  password: 'pragalya123',
  database: 'iqac_ce',
};

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Utility function to handle MySQL queries
const queryDatabase = async (query, values = []) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } finally {
    await connection.end();
  }
};

// Endpoint to fetch register numbers
app.get('/registerNumbers', async (req, res) => {
  try {
    const query = 'SELECT register_number FROM master_students';
    const results = await queryDatabase(query);
    const registerNumbers = results.map(row => ({
      value: row.register_number,
      label: row.register_number,
    }));
    res.json(registerNumbers);
  } catch (err) {
    console.error('Error fetching register numbers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch Mode_of_excemption options
app.get('/modeOptions', async (req, res) => {
  try {
    const query = 'SELECT id, mode_name FROM mode_ex';
    const results = await queryDatabase(query);
    const modeOptions = results.map(row => ({
      value: row.id,
      label: row.mode_name,
    }));
    res.json(modeOptions);
  } catch (err) {
    console.error('Error fetching mode options:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch elective names
app.get('/electiveNames', async (req, res) => {
  try {
    const query = 'SELECT id, electiveName FROM elective_name';
    const results = await queryDatabase(query);
    const electiveNames = results.map(row => ({
      value: row.id,
      label: row.electiveName,
    }));
    res.json(electiveNames);
  } catch (err) {
    console.error('Error fetching elective names:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to handle form submission
app.post('/submitForm', async (req, res) => {
  const { register_number, semester, department, addHm, courseID, courseName, electiveId } = req.body;

  if (!register_number || !semester || !department || !addHm || !courseID || !courseName || !electiveId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const checkSql = `
    SELECT COUNT(*) AS count
    FROM add_on
    WHERE register_number = ? AND course_code = ? AND course_name = ?
  `;
  const checkValues = [register_number, courseID, courseName];

  try {
    const [result] = await queryDatabase(checkSql, checkValues);
    if (result.count > 0) {
      return res.status(400).json({ error: 'The combination of Register Number, Course Code, and Course Name already exists' });
    }

    const insertSql = `
      INSERT INTO add_on (register_number, semester, department, Mode_of_exce, course_code, course_name, elective_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [register_number, semester, department, addHm, courseID, courseName, electiveId];

    await queryDatabase(insertSql, insertValues);
    res.status(200).send('Form submitted successfully');
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Form submission failed');
  }
});

// Endpoint to handle multiple file uploads for courses
app.post('/upload/multipleHM', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rows = xlsx.utils.sheet_to_json(sheet);

    rows = rows.slice(1); // Skip the first row

    const connection = await mysql.createConnection(dbConfig);

    let successCount = 0;
    const errorMessages = [];

    for (const row of rows) {
      try {
        const regNo = row.register_number ? row.register_number.toUpperCase() : null;
        const courseCode = row.course_code ? row.course_code.toUpperCase() : null;
        const courseName = row.course_name ? row.course_name.toUpperCase() : null;
        const modeOfExceName = row.mode_of_exce ? row.mode_of_exce.toUpperCase() : '0'; // Default to '0' if not provided

        if (!regNo || !courseCode || !courseName || !modeOfExceName) {
          errorMessages.push(`Missing required field in row: ${JSON.stringify(row)}`);
          continue;
        }

        const [modeRows] = await connection.execute(
          'SELECT id FROM mode_ex WHERE mode_name = ?',
          [modeOfExceName]
        );

        if (modeRows.length === 0) {
          errorMessages.push(`Invalid mode_of_exce: ${modeOfExceName}`);
          continue;
        }

        const modeOfExce = modeRows[0].id;

        const [existingRows] = await connection.execute(
          `SELECT COUNT(*) as count 
           FROM add_on 
           WHERE register_number = ? 
           AND (course_code = ? OR course_name = ?)
           AND mode_of_exce IN (0, 1, 2)`,
          [regNo, courseCode, courseName]
        );

        if (existingRows[0].count > 0) {
          errorMessages.push(`Course already exists for ${regNo} with course code ${courseCode} or course name ${courseName} in mode_of_exce 0, 1, or 2`);
          continue;
        }

        await connection.execute(
          'INSERT INTO add_on (name, register_number, department, semester, mode_of_exce, course_code, course_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [null, regNo, 1, 1, modeOfExce, courseCode, courseName]
        );

        successCount++;
      } catch (rowError) {
        console.error(`Error processing row: ${JSON.stringify(row)}`, rowError);
        errorMessages.push(`Error processing row for ${row.register_number || 'unknown'}: ${rowError.message}`);
      }
    }

    await connection.end();

    fs.unlinkSync(req.file.path); // Clean up the uploaded file

    res.status(200).json({
      message: 'Courses uploaded successfully',
      count: successCount,
      errors: errorMessages,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Endpoint to fetch pending approvals
app.get('/facultyApprovals', async (req, res) => {
  const sql = `SELECT add_on.id, add_on.register_number, master_students.name, add_on.department, add_on.semester, mode_ex.mode_name AS Mode_of_exce, add_on.course_code, add_on.course_name, elective_name.electiveName AS elective_id, add_on.approval_status, add_on.doa, add_on.status, add_on.remark
               FROM add_on
               JOIN master_students ON add_on.register_number = master_students.register_number
               JOIN mode_ex ON add_on.Mode_of_exce = mode_ex.id
               JOIN elective_name ON add_on.elective_id = elective_name.id
               WHERE add_on.approval_status = 0`;

  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (err) {
    console.error('Error fetching faculty approvals:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fetch rejected approvals
app.get('/facultyAddonRej', async (req, res) => {
  const sql = `SELECT add_on.id, add_on.register_number, master_students.name, add_on.department, add_on.semester, mode_ex.mode_name AS Mode_of_exce, add_on.course_code, add_on.course_name, elective_name.electiveName AS elective_id, add_on.approval_status, add_on.doa, add_on.status, add_on.remark
               FROM add_on
               JOIN master_students ON add_on.register_number = master_students.register_number
               JOIN mode_ex ON add_on.Mode_of_exce = mode_ex.id
               JOIN elective_name ON add_on.elective_id = elective_name.id
               WHERE add_on.approval_status = -1`;

  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (err) {
    console.error('Error fetching rejected approvals:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fetch approved approvals
app.get('/facultyAddonApp', async (req, res) => {
  const sql = `SELECT add_on.id, add_on.register_number, master_students.name, add_on.department, add_on.semester, mode_ex.mode_name AS Mode_of_exce, add_on.course_code, add_on.course_name, elective_name.electiveName AS elective_id, add_on.approval_status, add_on.doa, add_on.status, add_on.remark
               FROM add_on
               JOIN master_students ON add_on.register_number = master_students.register_number
               JOIN mode_ex ON add_on.Mode_of_exce = mode_ex.id
               JOIN elective_name ON add_on.elective_id = elective_name.id
               WHERE add_on.approval_status = 1`;

  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (err) {
    console.error('Error fetching approved approvals:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to approve requests
app.put('/approveApproval/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { approval_status } = req.body;

  if (approval_status !== 1) {
    return res.status(400).json({ message: 'Invalid approval status' });
  }

  try {
    await queryDatabase('UPDATE add_on SET approval_status = ?, approved_by = ? WHERE id = ?', [approval_status, 'admin', id]);
    res.status(200).json({ message: 'Approval updated successfully' });
  } catch (err) {
    console.error('Error updating approval status:', err);
    res.status(500).json({ message: 'Error updating approval status' });
  }
});

// Endpoint to reject requests
app.put('/rejectApproval/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { approval_status, remark } = req.body;

  if (approval_status !== -1) {
    return res.status(400).json({ message: 'Invalid approval status' });
  }

  try {
    await queryDatabase('UPDATE add_on SET approval_status = ?, rejected_by = ?, remark = ? WHERE id = ?', [approval_status, 'admin', remark, id]);
    res.status(200).json({ message: 'Approval updated successfully' });
  } catch (err) {
    console.error('Error updating approval status:', err);
    res.status(500).json({ message: 'Error updating approval status' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
