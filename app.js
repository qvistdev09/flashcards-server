const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

const origin = 'http://localhost:3000';
app.use(cors({ origin }));

const users = require('./routes/users');
const decks = require('./routes/decks');

app.use('/users', users);
app.use('/decks', decks);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

module.exports = app;
