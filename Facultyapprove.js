// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const { app } = require('./app');
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// // const pool = mysql.createPool({
// //   connectionLimit: 10,
// //   host: 'localhost',
// //   user: 'PragalyaK',
// //   password: 'pragalya123',
// //   database: 'iqac_ce'
// // });

// // Endpoint to approve an application
// app.post('/approve', async (req, res) => {
//   const { id } = req.body;
//   try {
//     const connection = await pool.getConnection();
//     await connection.execute('UPDATE InternshipApplications SET approval_status = 1 WHERE id = ?', [id]);
//     connection.release();
//     res.status(200).json({ message: 'Application approved successfully' });
//   } catch (error) {
//     console.error('Error approving application:', error);
//     res.status(500).json({ error: 'Failed to approve application' });
//   }
// });

// // Endpoint to reject an application with a remark
// app.post('/reject', async (req, res) => {
//   const { id, remark } = req.body;
//   try {
//     const connection = await pool.getConnection();
//     await connection.execute('UPDATE InternshipApplications SET approval_status = -1, remark = ? WHERE id = ?', [remark, id]);
//     connection.release();
//     res.status(200).json({ message: 'Application rejected successfully' });
//   } catch (error) {
//     console.error('Error rejecting application:', error);
//     res.status(500).json({ error: 'Failed to reject application' });
//   }
// });

// // Endpoint to fetch approved applications
// app.get('/approvedApplications', async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
//     const [rows] = await connection.query('SELECT name, StartDate, EndDate, Industry, Duration, certificateFilePath, reportFilePath FROM InternshipApplications WHERE approval_status = 1');
//     connection.release();
//     res.status(200).json({ data: rows });
//   } catch (error) {
//     console.error('Error fetching approved applications:', error);
//     res.status(500).json({ error: 'Failed to fetch approved applications' });
//   }
// });

// // Endpoint to fetch rejected applications
// app.get('/rejectedApplications', async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
//     const [rows] = await connection.query('SELECT name, StartDate, EndDate, Industry, Duration, certificateFilePath, reportFilePath FROM InternshipApplications WHERE approval_status = -1');
//     connection.release();
//     res.status(200).json({ data: rows });
//   } catch (error) {
//     console.error('Error fetching rejected applications:', error);
//     res.status(500).json({ error: 'Failed to fetch rejected applications' });
//   }
// });

// // Handle file uploads
// app.post('/upload', upload.fields([{ name: 'certificateFile', maxCount: 1 }, { name: 'reportFile', maxCount: 1 }]), async (req, res) => {
//   const { student_id, StartDate, EndDate, Industry, Duration } = req.body;
//   const certificateFilePath = req.files.certificateFile ? req.files.certificateFile[0].filename : null;
//   const reportFilePath = req.files.reportFile ? req.files.reportFile[0].filename : null;

//   try {
//     const connection = await pool.getConnection();
//     await connection.execute(
//       'INSERT INTO InternshipApplications (student_id, StartDate, EndDate, Industry, Duration, certificateFilePath, reportFilePath) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [student_id, StartDate, EndDate, Industry, Duration, certificateFilePath, reportFilePath]
//     );
//     connection.release();
//     res.status(200).json({ message: 'Files uploaded and data inserted successfully' });
//   } catch (error) {
//     console.error('Error uploading files and inserting data:', error);
//     res.status(500).json({ error: 'Failed to upload files and insert data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
