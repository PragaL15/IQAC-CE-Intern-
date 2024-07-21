const express = require('express');
const { getRegisterNumbers, submitForm } = require('../controllers/formController');
const router = express.Router();

router.get('/registerNumbers', getRegisterNumbers);
router.post('/submitForm', submitForm);

module.exports = router;
