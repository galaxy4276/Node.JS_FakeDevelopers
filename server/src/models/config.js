import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const env = process.env;

export const development = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  dialectOptions: {
    timezone: 'Etc/GMT+9',
  },
};

export const production = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  timezone: "Etc/GMT0",
};

export const test = {
  username: env.MARIADB_USERNAME,
  password: env.MARIADB_PASSWORD,
  database: env.MARIADB_DATABASE,
  host: env.MARIADB_HOST,
  dialect: 'mariadb',
  port: env.MARIADB_PORT,
  timezone: "Etc/GMT0",
};