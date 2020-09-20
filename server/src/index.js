import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';


import connectMaria from './lib/connectMaria';

import testRouter from './routes/test.router';
import globalRouter from './routes/globalRouter';
import routes from './routes';



const app = express();
config();
connectMaria();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT);
app.set('views', routes.frontView);


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(routes.frontCss));
app.use(express.static(routes.frontEs6));
app.use(express.static(routes.forntImg));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', globalRouter);
app.use('/test', testRouter);



app.listen(app.get('port'), () => {
  console.log('실행중 테스트');
});