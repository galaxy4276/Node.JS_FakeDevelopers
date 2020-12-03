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

auth.get('/forgot_sendEmail', (req, res) => {
  res.render('import/auth/forgot_sendEmail', {});
});

auth.post('/forgot_sendEmail', forgotHash, sendMail, (req, res) => {
  res.redirect('/auth/forgot_check');
});

auth.get('/forgot_check', (req, res) => {
  res.render('import/auth/forgot_check');
});

auth.post('/forgot_check', async (req, res, next) => {
  const { hash } = req.body;
  try {
    const user = await User.findOne({ where: { hash }});
     if (user) {
       res.redirect(url.format({
         pathname: '/auth/forgot_resetPassword',
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

auth.get('/forgot_resetPassword', (req, res) => {
  console.log(req.query);
  res.render('import/auth/forgot_resetPassword', { hash: req.query.hash });
});

auth.post('/forgot_resetPassword', async (req, res, next) => {
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

auth.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});



export default auth;