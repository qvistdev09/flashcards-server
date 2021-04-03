const { Deck } = require('./deck');
const { Card } = require('./card');

Deck.hasMany(Card, { foreignKey: { name: 'deckId', allowNull: false } });
Card.belongsTo(Deck, { foreignKey: { name: 'deckId', allowNull: false } });

module.exports = { Deck, Card };
