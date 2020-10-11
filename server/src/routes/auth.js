import { join, login, postLogin, postJoin } from '../controllers/auth';


const auth = require('express').Router();



auth.get('/login', login);
auth.post('/login', postLogin);
auth.get('/join', join);
auth.post('/join', postJoin);
auth.get('/forgot', (req, res) => {
  res.render('import/forgot', {});
});



export default auth;