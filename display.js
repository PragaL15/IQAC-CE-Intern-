app.post('/display', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { rollNo, name, degree, branch, year, semester } = req.body;

    let sql = 'SELECT * FROM internshipapplications WHERE 1=1';
    let values = [];

    if (rollNo) {
      sql += ' AND rollNo = ?';
      values.push(rollNo);
    }
    if (name) {
      sql += ' AND name LIKE ?';
      values.push(`%${name}%`);
    }
    if (degree) {
      sql += ' AND degree = ?';
      values.push(degree);
    }
    if (branch) {
      sql += ' AND branch = ?';
      values.push(branch);
    }
    if (year) {
      sql += ' AND year = ?';
      values.push(year);
    }
    if (semester) {
      sql += ' AND semester = ?';
      values.push(semester);
    }

    const [rows] = await connection.query(sql, values);
    connection.release();

    // Format the data as per frontend expectations
    const formattedData = rows.map(row => ({
      name: row.name,
      rollNo: row.rollNo,
      year: row.year,
      semester: row.semester,
      degree: row.degree,
      branch: row.branch,
      specialLab: row.specialLab,
      mode: row.mode,
      Industry: row.Industry,
      StartDate: row.StartDate,
      EndDate: row.EndDate,
      duration: row.duration,
      stipend: row.stipend,
      amount: row.amount,
      courseException: row.courseException,
      certificateFilePath: row.certificateFilePath,
      reportFilePath: row.reportFilePath
    }));

    res.status(200).json({ data: formattedData });
  } catch (error) {
    console.error('Error in Fetching data:', error);
    res.status(500).json({ error: 'Error in Fetching data' });
  }
});
