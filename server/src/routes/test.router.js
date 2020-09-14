import { test } from '../models/config';
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
  const userId = req.params.userId;
  const user = await User.findByPk(userId);
  console.log(user);

  res.json(user);
})


export default testRouter;