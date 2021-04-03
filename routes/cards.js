const router = require('express').Router();
const { authRequired } = require('../auth/auth-middleware');
const { Deck } = require('../database/schemas/deck');
const { Card } = require('../database/schemas/card');

router.post('/', authRequired, async (req, res) => {
  const { uid } = req.jwt.claims;
  if (!req.body.card || !req.body.card.cardFront || !req.body.card.cardBack || !req.body.card.deckSlug) {
    return res.status(400).end();
  }
  const { cardFront, cardBack, deckSlug } = req.body.card;
  console.log(deckSlug)

  const matchedDeck = await Deck.findOne({
    where: {
      deckOwner: uid,
      deckSlug,
    },
  });

  if (matchedDeck === null) {
    return res.status(404).end();
  }

  await Card.create({
    cardFront,
    cardBack,
    deckId: matchedDeck.deckId,
  });
  res.status(201).end();
});

module.exports = router;
