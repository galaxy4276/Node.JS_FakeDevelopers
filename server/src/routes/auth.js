import { join, login, postJoin } from '../controllers/auth';


const auth = require('express').Router();


auth.get('/login', login);
auth.get('/join', join);
auth.post('/join', postJoin);



export default auth;