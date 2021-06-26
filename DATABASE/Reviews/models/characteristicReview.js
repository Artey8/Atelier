const { DataTypes } = require('sequelize');
// const { Deferrable } = require('sequelize');
const { sequelize } = require('../db');
// const { Characteristic } = require('./characteristic');
// const { Review } = require('./review');

/**
 * CharacteristicReview has foreign key constraints commented out. The query to copy the prexisting
 * data from the CSV into the DB was hanging due to the foreign key constraints. If needed, the
 * constraints can be applied later with a separate query.
 */
const CharacteristicReview = sequelize.define('CharacteristicReview', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  characteristic_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Characteristic,
    //   key: 'id',
    //   deferrable: Deferrable.INITIALLY_DEFERRED,
    // },
  },
  review_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Review,
    //   key: 'id',
    //   deferrable: Deferrable.INITIALLY_DEFERRED,
    // },
  },
  value: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = CharacteristicReview;
