const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MODE = "development";
const fs = require("fs");
const webpack = require("webpack");
const OUTPUT_DIR = path.resolve(__dirname, "build");

// pug에서 html로 컴파일을 해주면 그 html에 스크립트 코드를 추가하는 함수
// 아래 html-webpack-plugin 플러그인에서 이 함수 사용
let htmlPageNames = ["index", "foobar", "fooooo"];
let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `${OUTPUT_DIR}/html/${name}.html`, // relative path to the HTML files
    filename: `html/${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    // html 파일별 요구하는 스크립트에 따라 청크를 분리하여 아웃풋에서 출력된 청크 이름을 chunks에 기입
  });
});

let verifyHtmlFiles = () => {
  const HTML_DIR = path.resolve(__dirname, "build", "html");
  const isHtmlDir = fs.existsSync(HTML_DIR); // 디렉터리가 있다면 True, 아니라면 False

  if (!isHtmlDir) {
    console.log(
      "\n =================================================================== \n" +
        "                                                                     \n" +
        "  pug 파일을 html로 컴파일하여 빌드합니다.                           \n" +
        "  빌드를 한번 더 실행하면 html 파일 내에 스크립트 태그가 삽입됩니다. \n" +
        "                                                                     \n" +
        " =================================================================== \n"
    );
  } else {
    console.log(
      "\n ================================================================================================== \n" +
        "                                                                                                    \n" +
        " [ html-webpack-plugin ]                                                                            \n" +
        "                                                                                                    \n" +
        "  빌드되었던 HTML 파일에 스크립트 태그를 삽입합니다.                                                \n" +
        "                                                                                                    \n" +
        "  태그 삽입이 완료되면 작업 시작 전에 webpack.config 하단의 concat 함수를 반드시 주석처리 해주세요. \n" +
        "  주석처리 하지 않을 시 스크립트 태그가 중복되어 쌓입니다.                                          \n" +
        "                                                                                                    \n" +
        " ================================================================================================== \n"
    );
  }
  return isHtmlDir;
};

const webpackConfig = {
  mode: MODE,

  devServer: {
    contentBase: `${OUTPUT_DIR}/html`,
    publicPath: "/",
    overlay: true,
    port: 3000,
    hot: true,
    inline: true,
    open: true,
    stats: "errors-only",
    host: "localhost",
  },

  devtool: "inline-source-map",
  // The side effect of this option is to increase build time
  // mode development ? ‘inline-source-map" : 'hidden-source-map’

  entry: {
    // 용도에 따라 js파일을 구분하고,
    // js 파일을 html 페이지에 별로 청크를 분리하여 작성
    index: path.resolve(__dirname, "src", "assets", "es6", "pages", "index.js"),
    foobar: path.resolve(
      __dirname,
      "src",
      "assets",
      "es6",
      "pages",
      "foobar.js"
    ),
    fooooo: path.resolve(
      __dirname,
      "src",
      "assets",
      "es6",
      "pages",
      "fooooo.js"
    ),
    // example1: [path.resolve(__dirname, "src", "assets", "es6", "ex1.js")
    // example2: path.resolve(__dirname, "src", "assets", "es6", "ex2.js"),
    // 각 호출 파일 내부에선 기능별 js를 import
  },

  output: {
    //  entry 에서 분리한 청크별로 다른 번들파일 출력
    path: OUTPUT_DIR,
    filename: "es5/[name].js", // 작업예약 200916: 청크해쉬 추가하고 html-webpack-plugin에서 지정하기!!
    publicPath: "../",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          "file-loader?name=html/[name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // (file-size > limit) ? use file-loader
              publicPath: "../",
              name: "img/[name].[ext]?[hash]", //  (mode == "production") ? name: "../img/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]?[hash]", //  (mode == "production") ? name: "../img/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ].concat(verifyHtmlFiles() ? multipleHtmlPlugins : []), // pug에서 컴파일되어 나온 html 파일별로 스크립트 코드 주입하여 출력, 웹팩을 watch 모드로 실행시 변경
};

module.exports = webpackConfig;

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//   }
//   if (argv.mode === "production") {
//   }
//   return config;
// };
