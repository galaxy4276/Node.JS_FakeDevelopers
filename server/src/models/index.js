import Sequelize from 'sequelize';
import { development, test } from './config';
import User from './User';
import fs from 'fs';


// const config = require(__dirname + '/../config/config.json')[env];
const config = test || development;
process.env.MARIADB_STATUS = config.database;
const db = {};

const logStream = fs.createWriteStream('src/log/mariadb.log', { 'flags': 'a' });

export const sequelize = new Sequelize(config.database, config.username, config.password, config, {
  logging: msg => logStream.write(msg),
});


db.User = User(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Object.keys(db).forEach(modelName => {
//  if (db[modelName].associate) {
//    db[modelName].associate(db);
//  }
// });

export default db;  