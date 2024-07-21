const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('iqac_ce', 'PragalyaK', 'pragalya123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
