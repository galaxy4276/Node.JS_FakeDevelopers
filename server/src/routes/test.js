import createBulkUsers from '../models/userQuery.test';
import sequelize from '../models';
import transEmail from '../controllers/mailer';

const { User } = sequelize;


const testRouter = require('express').Router();

testRouter.get('/create-bulk-users', (req, res) => {
  try {
    createBulkUsers();
  } catch (e) {
    console.log('create-bulk-users 에러');
  }

 res.redirect('/');
});

testRouter.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { dataValues } = await User.findByPk(userId);
  console.log(dataValues);

  res.json(dataValues);
  res.end();
});

testRouter.get('/email', (req, res) => res.render('test/email'));
testRouter.post('/email', transEmail);

testRouter.get('/__dev_bear', (req, res) => {
  res.render('screens/__dev_bear', {});
});
testRouter.get('/__dev_galaxy', (req, res) => {
  res.render('screens/__dev_galaxy', {});
});
testRouter.get('/__dev_wscrg', (req, res) => {
  res.render('screens/__dev_wscrg', {});
});

export default testRouter;