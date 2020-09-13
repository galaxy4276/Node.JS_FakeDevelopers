import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import connectMaria from './lib/connectMaria';



const app = express();
config();
connectMaria();


app.set('view engine', 'pug');
app.set('port', process.env.PORT);
app.set('views', path.resolve(__dirname, 'views'));


app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: '',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.listen(app.get('port'), () => {
  console.log('실행중 테스트');
});