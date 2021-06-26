const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

/**
 * ReviewPhoto has a foreign key constraint commented out. The query to copy the prexisting
 * data from the CSV into the DB was hanging due to the foreign key constraints. If needed, the
 * constraints can be applied later with a separate query.
 */
const ReviewPhoto = sequelize.define('ReviewPhoto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  review_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Review,
    //   key: 'id',
    // },
  },
  url: {
    type: DataTypes.TEXT,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = ReviewPhoto;
