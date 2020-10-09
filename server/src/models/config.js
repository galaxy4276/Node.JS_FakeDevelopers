/* eslint-disable no-unused-vars */
require('dotenv').config();

const env = process.env;

const development = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
};

const production = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
};

const test = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_TEST_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  timezone: "Etc/GMT0",
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
};

module.exports = test;