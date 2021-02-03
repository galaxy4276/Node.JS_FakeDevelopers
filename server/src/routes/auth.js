import { join, login, postLogin, postJoin, forgotHash } from '../controllers/auth';
import sendMail from '../controllers/mailer';
import sequelize from '../models';
import bcrypt from 'bcrypt';
import url from 'url';
const { User } = sequelize;
import { isLoggedIn, isNotLoggedIn } from '../controllers/post';
import passport from 'passport';
import { appState } from '../index';

const auth = require('express').Router();


auth.get('/login', isNotLoggedIn, login);
auth.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.redirect('/?error=login_failed');
      }
      if (user)
        req.login(user, err => {
          if (err) return next(err);
        });
      return res.redirect('/');
    })(req, res, next)
  }
);

auth.get('/join', isNotLoggedIn, join);
auth.post('/join', postJoin);

auth.get('/forgot_sendEmail', isNotLoggedIn , (req, res) => {
  res.render('import/auth/forgot_sendEmail', {});
});

auth.post('/forgot_sendEmail',isNotLoggedIn, forgotHash, sendMail, (req, res) => {
  res.redirect('/auth/forgot_check');
});

auth.get('/forgot_check', isNotLoggedIn, (req, res) => {
  res.render('import/auth/forgot_check');
});

auth.post('/forgot_check', isNotLoggedIn, async (req, res, next) => {
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

auth.get('/forgot_resetPassword', isNotLoggedIn, (req, res) => {
  console.log(req.query);
  res.render('import/auth/forgot_resetPassword', { hash: req.query.hash });
});

auth.post('/forgot_resetPassword', isNotLoggedIn, async (req, res, next) => {
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
});

auth.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  return res.redirect('/');
});



export default auth;