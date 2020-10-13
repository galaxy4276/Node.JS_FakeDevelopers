import { join, login, postLogin, postJoin, forgotHash } from '../controllers/auth';
import sendMail from '../controllers/mailer';
import sequelize from '../models';
import bcrypt from 'bcrypt';
import url from 'url';
const { User } = sequelize;


const auth = require('express').Router();



auth.get('/login', login);
auth.post('/login', postLogin);
auth.get('/join', join);
auth.post('/join', postJoin);
auth.get('/forgot', (req, res) => {
  res.render('import/forgot', {});
});

auth.post('/forgot', forgotHash, sendMail, (req, res) => {
  res.redirect('/auth/forgot2');
});

auth.get('/forgot2', (req, res) => {
  res.render('import/forgot2');
});

auth.post('/forgot2', async (req, res, next) => {
  const { hash } = req.body;
  try {
    const user = await User.findOne({ where: { hash }});
     if (user) {
       res.redirect(url.format({
         pathname: '/auth/forgot3',
         query: {
           'hash': user.hash
         }
       }));
     }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

auth.get('/forgot3', (req, res) => {
  console.log(req.query);
  res.render('import/forgot3', { hash: req.query.hash });
});

auth.post('/forgot3', async (req, res, next) => {
  const { newPw } = req.body;
  try {
    console.log(req.query);
    const hash = req.query.hash;
    const user = await User.findOne({ where: { hash }});
    user.password = await bcrypt.hash(newPw, 13);
    user.save();
    res.redirect(url.format({
      pathname: '/',
      query: {
        "message": "change_password"
      },
    }));
  } catch (err) {
    console.error(err);
    next(err);
  }
})




export default auth;