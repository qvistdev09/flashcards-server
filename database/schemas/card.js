const sequelize = require('../db-connect');
const { DataTypes } = require('sequelize');

const Card = sequelize.define('Card', {
  front: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  back: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Deck = sequelize.define('Deck', {
  settings: { type: DataTypes.STRING, allowNull: false },
});

Deck.hasMany(Card);
Card.belongsTo(Deck);

module.exports = { Card, Deck };
