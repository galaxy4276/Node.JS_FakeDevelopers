/* --- express 서버관련 모듈 import  --- */
import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import MySQLStore from 'express-mysql-session';
import methodOverride from 'method-override';
import favicon from 'serve-favicon';

/* --- 개인 라이브러리 관련 모듈 import  --- */
import connectMaria from './lib/connectMaria';
import passportConfig from './controllers/passport';
import sharePug from './lib/sharePug';

/* --- 라우트 관련 모듈 import  --- */
import test from './routes/test';
import global from './routes/global';
import auth from './routes/auth';
import routes from './routes';
import commRouter from './routes/category/community';
import footRouter from './routes/category/footprint';
import introRouter from './routes/category/intro';
import mileRouter from './routes/category/milestone';

const app = express(); // 서버 객체 생성
config(); // 환경변수 불러오기
passportConfig();
connectMaria(); // DB 검증 및 연결
const sessionStore = new MySQLStore({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_TEST_DATABASE,
}); // 세션 유지 함수


app.set('view engine', 'pug'); // 서버 View 엔진을 ejs로 설정
// app.engine('html', require('ejs').renderFile); // 서버 엔진을 ejs 설정으로
app.set('port', process.env.PORT || 8001); // 포트번호를 환경설정 포트 값으로 설정
app.set('views', path.resolve(__dirname, 'public', 'views')); // view 디렉터리 위치 설정

app.use(cors()); // Cross Origin 문제 해결 미들웨어
app.use(helmet()); // 보안 관련 미들웨어
app.use(methodOverride('_method'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // 서버 로깅
} else {
  app.use(morgan('combined')); // 서버 로깅
}

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')));
app.use('/css', express.static(routes.frontCss)); // 프론트 CSS 파일 위치
app.use('/es5', express.static(routes.frontEs6)); // 프론트 자바스크립트 파일 위치
app.use('/img', express.static(routes.frontImg)); // 프론트 이미지파일 위치
app.use('/font', express.static(routes.frontFont)); // 프론트 폰트 파일 위치
app.use(express.json()); // json으로 이루어진 Request Body 데이터를 받아오는 미들웨어
app.use(
  express.urlencoded({   extended: true })
); /* body 데이터를 자동으로 req.body에 추가해주는 미들웨어
  extended 옵션은 qs모듈을 사 용할지 query-string 모듈을 사용할 지 결정한다.
  둘의 차이는 nested를 지원하느냐 하지 않느냐
  https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
*/
app.use(cookieParser(process.env.secret)); // 쿠키 생성 관련 미들웨어
app.use(
  session({
    secret: process.env.secret,
    proxy: true,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
); /*
  세션 미들웨어
  secret: 세션의 비밀키
  resave: 요청 시 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 여부
  saveUnitialized: 세션에 저장할 내역이 없더라도 세션을 저장할지 대한 여부
  store: 서버가 종료되어도 세션을 DB에 저장하여서 유지
  cookie: 세션 쿠키에 대한 설정
  cookie => httpOnly: 웹 서버를 통해서만 cookie 접근을 할 수 있도록 하는 옵션
  cookie => secure: true 설정 시 https 에서만 접근이 가능함.
*/
app.use(passport.initialize()); // 유저 데이터 요청으로부터 serialize/deserialize 함수를 설정
app.use(passport.session()); // passport가 세션정보에 접근할 수 있도록 하는 미들웨어
app.use(sharePug);


/* 라우터 미들웨어들 */
app.use((req, res, next) => {
  console.log('cookie');
  console.table(req.cookies);
  console.log('session');
  console.table(req.session);
  next();
}); // 일반 테스트용 미들웨어 ( 삭졔 예정 )

app.use('/', global);
app.use('/auth', auth);
app.use('/test', test);

/* 학과 카테고리 라우터 */
app.use('/community', commRouter);
app.use('/footprint', footRouter);
app.use('/intro', introRouter);
app.use('/milestone', mileRouter);

/* 에러 처리 미들웨어 */
app.use('/', (req, res, next) => {
  const err = new Error('Not Found');
  next(err);
});
app.use((err, req, res, next) => {
  err.status = 404;
  console.log(err);
  res.render('common/error/404', { err });
});
/* 앱 실행  */
app.listen(app.get('port'), () => {
  console.log('실행중 테스트');
});
