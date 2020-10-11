import { join, login, postLogin, postJoin } from '../controllers/auth';


const auth = require('express').Router();



auth.get('/login', login);
auth.post('/login', postLogin);
auth.get('/join', join);
auth.post('/join', postJoin);
auth.get('/find', (req, res) => {
  res.render('import/find', {});
});



export default auth;