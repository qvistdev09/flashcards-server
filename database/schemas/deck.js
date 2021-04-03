const sequelize = require('../db-connect');
const { DataTypes } = require('sequelize');

const Deck = sequelize.define('Deck', {
  deckId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  deckOwner: { type: DataTypes.STRING, allowNull: false },
  deckTitle: { type: DataTypes.STRING, allowNull: false },
  deckSlug: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = { Deck };