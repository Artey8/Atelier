const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  summary: {
    type: DataTypes.STRING(512),
  },
  body: {
    type: DataTypes.TEXT,
  },
  recommend: {
    type: DataTypes.BOOLEAN,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  response: {
    type: DataTypes.TEXT,
  },
  reviewer_name: {
    type: DataTypes.STRING(100),
  },
  reviewer_email: {
    type: DataTypes.STRING(100),
  },
  helpfulness: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: 'date',
  updatedAt: false,
});

module.exports = Review;
