const sequelize = require('../config/database');
const RegisterNumber = require('./RegisterNumber');
const Form = require('./Form');

const syncDb = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  RegisterNumber,
  Form,
  syncDb,
};
