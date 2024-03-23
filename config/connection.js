require('dotenv').config();

const { Sequelize } = require('sequelize');

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Missing required environment variables for database connection.');
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
