const { sequelize } = require('../db');

// The autoincrements for each table need to start after the highest pre-existing ID
const setAutoIncrementStart = async () => {
  await sequelize.query('ALTER SEQUENCE "Reviews_id_seq" RESTART WITH 5774953;');
  await sequelize.query('ALTER SEQUENCE "Characteristics_id_seq" RESTART WITH 3347680;');
  await sequelize.query('ALTER SEQUENCE "ReviewPhotos_id_seq" RESTART WITH 2742541;');
  await sequelize.query('ALTER SEQUENCE "CharacteristicReviews_id_seq" RESTART WITH 19327576;');
};

module.exports = setAutoIncrementStart;
