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
    charset: 'utf8mb4_general_ci',
    dataString: true,
    typeCast: true,
    timezone: '-09:00',
  },
  define: {
    timestamps: true,
    supportBigNumbers: true,
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
    timezone: 'Asia/Seoul',
  },
};

const test = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_TEST_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    collation: 'utf8mb4_general_ci',
    dataString: true,
    typeCast: true,
    useUTC: false,
  },
  define: {
    supportBigNumbers: true,
  },
};

module.exports = test;
