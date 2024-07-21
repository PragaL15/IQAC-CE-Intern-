const mysql = require('mysql2/promise');

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'PragalyaK',
  password: 'pragalya123',
  database: 'iqac_ce'
});

// Function to execute a SELECT query and return the results
async function get_query_database(sql, params) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(sql, params);
  connection.release();
  return rows;
}

// Function to execute an INSERT, UPDATE, or DELETE query
async function post_query_database(sql, params) {
  const connection = await pool.getConnection();
  await connection.execute(sql, params);
  connection.release();
}

module.exports = {
  get_query_database,
  post_query_database
};
