const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_QUESTIONS_TYPE,
  DB_QUESTIONS_NAME,
  DB_QUESTIONS_HOST,
  DB_QUESTIONS_PORT,
  DB_QUESTIONS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_QUESTIONS_TYPE}://${DB_QUESTIONS_USER}@${DB_QUESTIONS_HOST}:${DB_QUESTIONS_PORT}/${DB_QUESTIONS_NAME}`, {
  logging: false,
});

module.exports.sequelize = sequelize;
