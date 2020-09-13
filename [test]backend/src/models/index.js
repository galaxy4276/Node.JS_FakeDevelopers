'use strict';
import Sequelize from 'sequelize';
import { development } from './config';


// const config = require(__dirname + '/../config/config.json')[env];
const config = development;
const db = {};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Object.keys(db).forEach(modelName => {
//  if (db[modelName].associate) {
//    db[modelName].associate(db);
//  }
// });

export default db;  