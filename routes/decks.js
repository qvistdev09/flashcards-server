const router = require('express').Router();
const { authRequired } = require('../auth/auth-middleware');
const { Deck } = require('../database/schemas/deck');
const { Card } = require('../database/schemas/card');

const { isDue } = require('../modules/date-functions');

router.get('/:deckSlug', authRequired, async (req, res) => {
  const { uid: deckOwner } = req.jwt.claims;
  const { deckSlug } = req.params;
  const matchedDeck = await Deck.findOne({
    where: { deckOwner, deckSlug },
  });
  if (matchedDeck === null) {
    return res.status(404).end();
  }
  const cards = await Card.findAll({
    where: { deckId: matchedDeck.deckId },
  });
  res.json({
    deck: matchedDeck.toJSON(),
    cards,
  });
});

router.get('/', authRequired, async (req, res) => {
  const { uid } = req.jwt.claims;
  const userDecks = await Deck.findAll({
    where: { deckOwner: uid },
  });
  const withDueCards = await Promise.all(
    userDecks.map(async deck => {
      const cards = await Card.findAll({
        where: { deckId: deck.deckId },
      });
      const due = cards.filter(card => isDue(card.cardDue)).length;
      return { ...deck.toJSON(), cards: cards.length, due };
    })
  );
  res.json(withDueCards);
});

router.post('/', authRequired, (req, res) => {
  const { uid } = req.jwt.claims;
  if (!req.body.deck || !req.body.deck.deckTitle) {
    return res.status(400).end();
  }
  const { deckTitle } = req.body.deck;
  const deckSlug = deckTitle.replace(/\s/g, '-').toLowerCase();

  Deck.create({
    deckOwner: uid,
    deckTitle,
    deckSlug,
  })
    .then(() => res.status(201).end())
    .catch(() => res.status(500).end());
});

router.delete('/', authRequired, async (req, res) => {
  const { uid } = req.jwt.claims;
  if (!req.body.deck || !req.body.deck.deckSlug) {
    return res.status(400).end();
  }
  const { deckSlug } = req.body.deck;
  const matchedDeck = await Deck.findOne({
    where: { deckSlug },
  });
  if (matchedDeck === null) {
    return res.status(404).end();
  }
  if (matchedDeck.deckOwner !== uid) {
    return res.status(401).end();
  }
  await matchedDeck.destroy();
  res.status(200).end();
});

module.exports = router;
