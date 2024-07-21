// Add a new GET endpoint to fetch internship applications data
app.get('/internshipApplications', (req, res) => {
  const sql = 'SELECT * FROM InternshipApplications';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error in Fetching data:', err);
      return res.status(500).json({ error: 'Error in Fetching data' });
    }
    return res.status(200).json({ data: result });
  });
});
