require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'Password@12',
    database: 'Nodejs',
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seed_data',
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seed_data',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seed_data',
    logging: false,
  },
};
