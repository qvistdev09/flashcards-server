const router = require('express').Router();
const { authRequired } = require('../auth/auth-middleware');
const { Deck } = require('../database/schemas/card');

router.get('/', authRequired, async (req, res) => {
  const { uid } = req.jwt.claims;
  const userDecks = await Deck.findAll({ where: { deckOwner: uid } });
  res.json(userDecks);
});

router.post('/', authRequired, (req, res) => {
  const { uid } = req.jwt.claims;
  if (!req.body.deck || !req.body.deck.deckTitle) {
    return res.status(400).end();
  }
  Deck.create({
    deckOwner: uid,
    deckTitle: req.body.deck.deckTitle,
  })
    .then(() => res.status(201).end())
    .catch(() => res.status(500).end());
});

module.exports = router;
