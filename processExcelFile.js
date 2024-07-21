const mysql = require('mysql2/promise');
const path = require('path');
const xlsx = require('xlsx');

// MySQL connection configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'PragalyaK',
  password: 'pragalya123',
  database: 'iqac_ce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to process the Excel file
async function processExcelFile(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Processing the Excel data and preparing SQL queries
    const connection = await pool.getConnection();

    try {
      const sql = `INSERT INTO intern_companylist (company_name, company_address, company_phone) VALUES (?, ?, ?)`;
      for (const row of data) {
        const { company_name, company_address, company_phone } = row;

        // Check if any parameter is undefined
        if (company_name === undefined || company_address === undefined || company_phone === undefined) {
          throw new Error('One of the columns contains an undefined value.');
        }

        // Convert company_phone to a number if necessary
        const companyPhoneNumber = Number(company_phone);
        if (isNaN(companyPhoneNumber)) {
          throw new Error('Invalid phone number format.');
        }

        await connection.execute(sql, [company_name, company_address, companyPhoneNumber]);
      }
      console.log('Data inserted successfully.');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Failed to process the Excel file:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Export the processExcelFile function
module.exports.processExcelFile = processExcelFile;
