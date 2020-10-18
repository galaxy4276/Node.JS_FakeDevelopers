import Sequelize from 'sequelize';
import env from './config';
import user from './user';
import certpost from './certpost';
import post from './post';
import suggest from './suggest';
import donate from './donate';
import award from './award';
import portfolio from './portfolio';
import image from './imgae';


const config = env;
process.env.MARIADB_STATUS = config.database;
const db = {};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = user(sequelize, Sequelize);
db.Certpost = certpost(sequelize, Sequelize);
db.Post = post(sequelize, Sequelize);
db.Suggest = suggest(sequelize, Sequelize);
db.Donate = donate(sequelize, Sequelize);
db.Award = award(sequelize, Sequelize);
db.Portfolio = portfolio(sequelize, Sequelize);
db.Image = image(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;  