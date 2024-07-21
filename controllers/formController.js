const { RegisterNumber, Form } = require('../models');

const getRegisterNumbers = async (req, res) => {
  try {
    const registerNumbers = await RegisterNumber.findAll();
    res.json(registerNumbers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch register numbers' });
  }
};

const submitForm = async (req, res) => {
  const { registerNumber, semester, department, addHm, courseID, courseName } = req.body;
  try {
    const form = await Form.create({ registerNumber, semester, department, addHm, courseID, courseName });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

module.exports = {
  getRegisterNumbers,
  submitForm,
};
