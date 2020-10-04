import createBulkUsers from '../models/userQuery.test';
import sequelize from '../models';

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
})


export default testRouter;