// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const mysql = require("mysql2");

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Setup multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Ensure the upload directory exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // MySQL Database Connection
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "PragalyaK",
//   password: "pragalya123",
//   database: "iqac_ce",
// });

// const db = pool.promise(); // Use promise-based API

// // Helper function to process Excel files
// const processExcelFile = (filePath) => {
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const data = XLSX.utils.sheet_to_json(worksheet);

//   return data;
// };

// // Route for single upload
// app.post("/upload/single", async (req, res) => {
//   const { company_name, company_address, company_phone } = req.body;

//   // Validate the request
//   if (!company_name || !company_address || !company_phone) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     // Insert into the database
//     await db.query(
//       "INSERT INTO companies (company_name, company_address, company_phone) VALUES (?, ?, ?)",
//       [company_name, company_address, company_phone]
//     );

//     res.status(200).json({ message: "Company added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding company to the database" });
//   }
// });

// // Route for multiple file upload
// app.post("/upload/multiple", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   try {
//     const data = processExcelFile(req.file.path);

//     // Process and insert data from the file
//     for (const row of data) {
//       const { company_name, company_address, company_phone } = row;
//       if (company_name && company_address && company_phone) {
//         await db.query(
//           "INSERT INTO companies (company_name, company_address, company_phone) VALUES (?, ?, ?)",
//           [company_name, company_address, company_phone]
//         );
//       }
//     }

//     // Clean up the uploaded file after processing
//     fs.unlinkSync(req.file.path);

//     res.status(200).json({
//       message: "File processed successfully",
//       count: data.length, // Number of rows processed
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error processing file" });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = file.fieldname === 'file' ? 'uploads/' : './public/images';
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure the upload directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// MySQL Database Connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'PragalyaK',
  password: 'pragalya123',
  database: 'iqac_ce',
});

// Helper function to process Excel files
const processExcelFile = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};



// Endpoint to handle internship applications
app.post('/internshipapplications', upload.fields([
  { name: 'certificateFile', maxCount: 1 },
  { name: 'reportFile', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Received Body:', req.body);
    console.log('Received Files:', req.files);

    const certificateFile = req.files['certificateFile'] ? req.files['certificateFile'][0].filename : null;
    const reportFile = req.files['reportFile'] ? req.files['reportFile'][0].filename : null;

    const sql = `
      INSERT INTO internshipapplications
      (name, rollNo, year, semester, degree, branch, specialLab, mode, Industry, StartDate, EndDate, duration, stipend, amount, courseException, certificateFilePath, reportFilePath, approval_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      req.body.name || null,
      req.body.rollNo || null,
      req.body.year || null,
      req.body.semester || null,
      req.body.degree || null,
      req.body.branch || null,
      req.body.specialLab || null,
      req.body.mode || null,
      req.body.Industry || null,
      req.body.StartDate || null,
      req.body.EndDate || null,
      req.body.duration || null,
      req.body.stipend || null,
      req.body.amount || null,
      req.body.courseException || null,
      certificateFile,
      reportFile,
      req.body.approval_status || 0
    ];

    const connection = await pool.getConnection();
    await connection.execute(sql, values);
    connection.release();

    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.error('Error in Insert query:', error);
    res.status(500).json({ error: 'Error in Insert query' });
  }
});




//fetch the Industry name in dropdown
app.get('/api/companies', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM companies');
    const companies = rows.map(company => ({
      value: company.id,
      label: company.company_name
    }));
    res.json(companies);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});




// Endpoint to approve an application
app.post('/approve', async (req, res) => {
  const { id } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('UPDATE internshipapplications SET approval_status = 1 WHERE id = ?', [id]);
    connection.release();
    res.status(200).json({ message: 'Application approved successfully' });
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({ error: 'Failed to approve application' });
  }
});





// Endpoint to reject an application with a remark
app.post('/reject', async (req, res) => {
  const { id, remark } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('UPDATE internshipapplications SET approval_status = -1, remark = ? WHERE id = ?', [remark, id]);
    connection.release();
    res.status(200).json({ message: 'Application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ error: 'Failed to reject application' });
  }
});




// Endpoint to fetch pending applications
app.get('/pendingApplications', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM internshipapplications WHERE approval_status = 0');
    connection.release();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ error: 'Failed to fetch pending applications' });
  }
});





// Endpoint to fetch approved applications
app.get('/approvedApplications', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM internshipapplications WHERE approval_status = 1 AND remark IS NULL');
    connection.release();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching approved applications:', error);
    res.status(500).json({ error: 'Failed to fetch approved applications' });
  }
});



// Endpoint to fetch rejected applications
app.get('/rejectedApplications', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM internshipapplications WHERE approval_status = -1 AND remark IS NOT NULL');
    connection.release();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching rejected applications:', error);
    res.status(500).json({ error: 'Failed to fetch rejected applications' });
  }
});



// Endpoint to fetch internship applications based on query parameter option
app.get('/internshipapplications', async (req, res) => {
  const { option } = req.query;
  let query = '';
  if (option == 1) {
    query = 'SELECT * FROM internshipapplications WHERE approval_status = 0'; // Pending applications
  } else if (option == 2) {
    query = 'SELECT * FROM internshipapplications WHERE approval_status = 1 AND remark IS NULL'; // Approved applications
  } else if (option == 3) {
    query = 'SELECT * FROM internshipapplications WHERE approval_status = -1 AND remark IS NOT NULL'; // Rejected applications
  } else {
    return res.status(400).json({ error: 'Invalid option' });
  }
  
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query);
    connection.release();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching internship applications:', error);
    res.status(500).json({ error: 'Failed to fetch internship applications' });
  }
});




// Endpoint to fetch all internship applications
app.get('/allInternshipApplications', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM internshipapplications');
    connection.release();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching internship applications:', error);
    res.status(500).json({ error: 'Failed to fetch internship applications' });
  }
});



// Route for single upload
app.post('/upload/single', async (req, res) => {
  let { company_name, company_address, company_phone } = req.body;
  company_name = company_name.toUpperCase();
  company_address = company_address.toUpperCase();
  company_phone = company_phone;
  if (!company_name || !company_address || !company_phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const [existingCompany] = await pool.query(
      "SELECT * FROM companies WHERE company_name = ? AND company_address = ?",
      [company_name, company_address]
    );

    if (existingCompany.length > 0) {
      return res.status(400).json({ message: "Company with this name and address already exists" });
    }
    await pool.query(
      "INSERT INTO companies (company_name, company_address, company_phone) VALUES (?, ?, ?)",
      [company_name, company_address, company_phone]
    );

    res.status(200).json({ message: "Company added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding company to the database" });
  }
});



// Route for multiple file upload
app.post('/upload/multiple', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const data = processExcelFile(req.file.path);

    let count = 0;

    for (const row of data) {
      let { company_name, company_address, company_phone } = row;

      // Convert to uppercase
      company_name = company_name.toUpperCase();
      company_address = company_address.toUpperCase();
      company_phone = company_phone;

      if (company_name && company_address && company_phone) {
        // Check if the combination of company_name and company_address already exists
        const [existingCompany] = await pool.query(
          'SELECT * FROM companies WHERE company_name = ? AND company_address = ?',
          [company_name, company_address]
        );

        if (existingCompany.length === 0) {
          await pool.query(
            'INSERT INTO companies (company_name, company_address, company_phone) VALUES (?, ?, ?)',
            [company_name, company_address, company_phone]
          );
          count++;
        }
      }
    }

    // Clean up the uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'File processed successfully',
      count, // Number of rows processed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file' });
  }
});


// Endpoint to serve uploaded images
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/images', filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error in Sending File:', err);
      res.status(500).json({ error: 'Error in Sending File' });
    }
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
