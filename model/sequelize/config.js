const Sequelize = require('sequelize');
const sequelize = new Sequelize('REPORTERIA', 'usraccmw', 'inc2001', {
  dialect: 'mssql',
  host: '10.80.36.238',
  operatorsAliases: false,
  dialectOptions: {
    encrypt: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

const sequelize2 = new Sequelize('Reportes', 'sa', '_B13ndificil$', {
  dialect: 'mssql',
  host: '10.80.36.53',
  operatorsAliases: false,
  dialectOptions: {
    encrypt: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

module.exports = {
    srv238: sequelize,
    srv53: sequelize2
};