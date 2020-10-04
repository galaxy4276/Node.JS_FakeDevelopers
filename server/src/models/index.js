import Sequelize from 'sequelize';
import env from './config';
import User from './User';


const config = env;
process.env.MARIADB_STATUS = config.database;
const db = {};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.User = User(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;  