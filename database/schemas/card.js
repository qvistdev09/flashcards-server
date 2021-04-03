const sequelize = require('../db-connect');
const { DataTypes } = require('sequelize');

const Card = sequelize.define('Card', {
  cardId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  cardFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Card };
