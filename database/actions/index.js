const { Deck, Card } = require('../schemas');

/* const mockDecks = [
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German nouns',
    deckSlug: 'german-nouns',
  },
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German verbs',
    deckSlug: 'german-verbs',
  },
  {
    deckOwner: '00ugbiaxaNhql8HG65d6',
    deckTitle: 'German adjectives',
    deckSlug: 'german-adjectives',
  },
]; */

const syncModels = async () => {
  await Deck.sync({ alter: true });
  await Card.sync({ alter: true });
  console.log('Models synced');
};

module.exports = { syncModels };
