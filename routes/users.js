const router = require('express').Router();
const { createUser } = require('../services/users-service');

router.post('/', async (req, res, next) => {
  // should validate inputs
  const newUser = req.body;
  const oktaResponse = await createUser(newUser);
  if (!oktaResponse.ok) {
    const jsonerror = await oktaResponse.json();
    console.log(jsonerror);
    return next(oktaResponse.statusText);
  }
  res.status(201).end();
});

module.exports = router;
