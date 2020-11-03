import Sequelize from 'sequelize';
import env from './config';
import user from './user';
import certpost from './certpost';
import suggest from './suggest';
import donate from './donate';
import award from './award';
import portfolio from './portfolio';
import image from './image';


const config = env;
process.env.MARIADB_STATUS = config.database;
const db = {};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = user;
db.Certpost = certpost;
db.Suggest = suggest;
db.Donate = donate;
db.Award = award;
db.Portfolio = portfolio;
db.Image = image;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;  