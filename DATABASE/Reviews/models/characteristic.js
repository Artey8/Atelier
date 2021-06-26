const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Characteristic = sequelize.define('Characteristic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = Characteristic;
