const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

const origin = 'http://localhost:3000';
app.use(cors({ origin }));

const users = require('./routes/users');

app.use('/users', users);

app.use('/', (req, res) => {
  res.json({ response: 'first response' });
});

module.exports = app;
