/* -- webpack dev server를 미들웨어로 사용하는 express 서버 -- */

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// webpack 설정
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require(path.resolve(__dirname, 'webpack.config.js'));

const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  contentBase: path.resolve(__dirname, 'public'),
  publicPath: '/',
  stats: {
    errors: true,
    colors: true,
    warnings: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errorDetails: false,
    publicPath: false,
  },
});

// webpack의 output 장소인 public을 express static으로 등록
const staticMiddleWare = express.static(path.resolve(__dirname, 'public'));

// 현재 퍼그 디렉터리 지정
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'src', 'views', 'import'));

// 경로 설정 (퍼그 import/ 아래 페이지 경로 )
const getPath = () => {
  const linkSolution = {
    '/': 'index',

    '/test/bear': '__dev/bear',
    '/test/wscrg': '__dev/wscrg',
    '/test/galaxy': '__dev/galaxy',

    '/auth/sendEmail': 'auth/sendEmail',
    '/auth/hashCheck': 'auth/hashCheck',
    '/auth/resetPassword': 'auth/resetPassword',

    '/community/board': 'community/board',
    '/community/donation': 'community/donation',
    '/community/suggestion': 'community/suggestion',
    '/community/notice': 'community/notice',

    '/footprint/acquisition': 'footprint/acquisition',
    '/footprint/awards': 'footprint/awards',
    '/footprint/portfolio': 'footprint/portfolio',

    '/intro/club': 'intro/club',
    '/intro/env': 'intro/env',
    '/intro/info': 'intro/info',
    '/intro/member': 'intro/member',

    '/milestone/career': 'milestone/career',
    '/milestone/cert': 'milestone/cert',
    '/milestone/curriculum': 'milestone/curriculum',
  };

  const get = (link) => {
    app.get(link, (___, res) => {
      res.render(linkSolution[link]);
    });
  };

  for (let link in linkSolution) {
    get(link);
  }
};

// 로컬 서버 실행
app.use(middleware); // 웹팩미들웨어가 static 이전에 위치!
app.use('/', staticMiddleWare);

getPath(); // 경로 지정

app.listen(port, () => {
  console.log(`App is Listening at http://localhost:${port}`);
});
