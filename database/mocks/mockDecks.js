const { Deck, Card } = require('../schemas/card');

const mockDecks = [
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German nouns',
  },
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German verbs',
  },
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German adjectives',
  },
];

const createMockData = async () => {
  await Deck.sync({ force: true });
  await Promise.all(mockDecks.map(deckObj => Deck.create(deckObj)));
  console.log('Mock decks created');
};

module.exports = { createMockData };
