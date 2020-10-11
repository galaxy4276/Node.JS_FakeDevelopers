import { join, login, postLogin, postJoin, forgotHash } from '../controllers/auth';
import sendMail from '../controllers/mailer';


const auth = require('express').Router();



auth.get('/login', login);
auth.post('/login', postLogin);
auth.get('/join', join);
auth.post('/join', postJoin);
auth.get('/find', (req, res) => {
  res.render('import/find', {});
});
auth.get('/forgot', (req, res) => {
  res.render('import/forgot', {});
});

auth.post('/forgot', forgotHash, sendMail, (req, res) => {
  res.render('import/forgot2', {});
});




export default auth;