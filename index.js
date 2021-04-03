require('dotenv').config();
require('./database/db-connect');

const { syncModels } = require('./database/actions');

syncModels();

const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
