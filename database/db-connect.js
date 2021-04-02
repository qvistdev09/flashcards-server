const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB');
  } catch (error) {
    console.log('error');
    console.log(error.message);
  }
})();

module.exports = sequelize;
