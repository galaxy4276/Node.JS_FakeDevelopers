import { join, login, postLogin, postJoin } from '../controllers/auth';


const auth = require('express').Router();



auth.get('/login', login);
auth.post('/login', postLogin);
auth.get('/join', join);
auth.post('/join', postJoin);



export default auth;