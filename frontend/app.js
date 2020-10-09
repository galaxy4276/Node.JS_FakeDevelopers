const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// webpack 설정
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require(path.resolve(__dirname, "webpack.config.js"));

const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  contentBase: path.resolve(__dirname, "public"),
  publicPath: "/",
  noInfo: true,
  hot: true,
  inline: true,
  open: true,
  progress: true,
  stats: {
    colors: true,
  },
});

// webpack의 output 장소인 public을 express static으로 등록
const staticMiddleWare = express.static(path.resolve(__dirname, "public"));

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "src", "views", "import"));

app.use(middleware); // 웹팩미들웨어가 static 이전에 위치!
app.use("/", staticMiddleWare);

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/test/bear", function (req, res) {
  res.render("__dev/bear");
});
app.get("/test/wscrg", function (req, res) {
  res.render("__dev/wscrg");
});
app.get("/test/galaxy", function (req, res) {
  res.render("__dev/galaxy");
});

app.listen(port, () => {
  console.log(`App is Listening at http://localhost:${port}`);
});
