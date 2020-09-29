/* -- module -- */
const path = require("path");
const fs = require("fs");
require("dotenv").config();

/* -- plugin --*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/* -- MODE -- */
const BUNDLE_POINT = process.env.BUNDLE_POINT;

/* -- DIR_PATH -- */
const OUTPUT_DIR = path.resolve(__dirname, "build");
const DEV_SERVER_DIR_NAME = "public";
const DEV_SERVER_DIR = path.resolve(
  __dirname,
  `../server/${DEV_SERVER_DIR_NAME}`
);
const PUG_DIR = path.resolve(__dirname, "src", "views");

/* -- output 1: dev_client -- */
// **** 신규 페이지 추가시에 이 곳에서 페이지 추가를 위한 작업 ****
// ** 1. htmlPageNames[] >> 페이지 이름 추가하기 **
// ** 2. webpackConfig_frontend{}.entry 에 entry JS 파일 경로 추가하기 **
const htmlPageNames = ["__dev_wscrg", "__dev_bear", "index"];
const multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `${OUTPUT_DIR}/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    // html 파일별 요구하는 스크립트에 따라 청크를 분리하여 아웃풋에서 출력된 청크 이름을 chunks에 기입
  });
});
const verifyHtmlDirBuild = () => {
  const isOutputDir = fs.existsSync(OUTPUT_DIR); // 디렉터리가 있다면 True, 아니라면 False

  if (!isOutputDir && BUNDLE_POINT === "frontend") {
    console.log(
      "\n ================================================================ \n" +
        "                                                                  \n" +
        "  [ webpack build ]                                               \n" +
        "                                                                  \n" +
        "   > frontend / build /                                           \n" +
        "                                                                  \n" +
        "  빌드를 한번 더 실행하면 html 파일에 스크립트 태그가 삽입됩니다. \n" +
        "                                                                  \n" +
        " ================================================================ \n"
    );
  } else if (isOutputDir && BUNDLE_POINT === "frontend") {
    console.log(
      "\n ============================================================================ \n" +
        "                                                                              \n" +
        " [ webpack build ]                                                            \n" +
        "                                                                              \n" +
        "   + [script tag] >> *.html                                                   \n" +
        "                                                                              \n" +
        "  dev-server 실행 중이 아니라면, html 파일 내에 스크립트 태그가 삽입됩니다.   \n" +
        "                                                                              \n" +
        "  태그 삽입이 완료되면 webpack.config 하단의 concat 함수를 주석처리 해주세요. \n" +
        "  다음 빌드부터 스크립트 태그가 중복되어 쌓이게 됩니다.                       \n" +
        "                                                                              \n" +
        " ============================================================================ \n"
    );
  }
  return isOutputDir;
};
const webpackConfig_frontend = {
  mode: process.env.DEV_MODE,

  devServer: {
    contentBase: OUTPUT_DIR,
    publicPath: "/",
    overlay: true,
    hot: true,
    inline: true,
    open: true,
    progress: true,
    stats: "errors-only",
  },

  devtool: "inline-source-map",
  // 콘솔에서 오류 경로를 번들 후 파일이 아닌 번들 전 파일로 명시해줌
  // The side effect of this option is to increase build time
  // mode development ? ‘inline-source-map" : 'hidden-source-map’

  entry: {
    /* 
      용도에 따라 js파일을 구분하고,
       js 파일을 html 페이지에 별로 청크를 분리하여 작성
       example1: path.resolve(__dirname, "src", "assets", "es6", "ex1.js")
       example2: path.resolve(__dirname, "src", "assets", "es6", "ex2.js"),
       각 호출 파일 내부에선 기능별 js를 import
      */

    // for prod
    index: path.resolve(__dirname, "src", "es6", "pages", "index.js"),

    // for dev
    __dev_bear: path.resolve(__dirname, "src", "es6", "pages", "__dev_bear.js"),
    __dev_wscrg: path.resolve(
      __dirname,
      "src",
      "es6",
      "pages",
      "__dev_wscrg.js"
    ),
  },

  output: {
    //  entry 에서 분리한 청크별로 다른 번들파일 출력
    path: OUTPUT_DIR,
    filename: "[name].js", // 작업예약 200916: 청크해쉬 추가하고 html-webpack-plugin에서 지정하기!!
    publicPath: "http://localhost:8080/",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          "file-loader?name=[name].html",
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
              publicPath: "./",
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
      filename: "[name].css",
    }),
  ].concat(verifyHtmlDirBuild() ? multipleHtmlPlugins : []), // pug에서 컴파일되어 나온 html 파일별로 스크립트 코드 주입하여 출력, 웹팩을 watch 모드로 실행시 변경
};

/* -- output 2: dev_server -- */
const copyPugDir = [
  new CopyWebpackPlugin({
    patterns: [{ from: PUG_DIR, to: DEV_SERVER_DIR + "/views" }],
  }),
];
const verifyPugDirBuild = () => {
  const isPugDir = fs.existsSync(
    path.resolve(DEV_SERVER_DIR, "views", "screens")
  );

  if (!isPugDir && BUNDLE_POINT === "server") {
    console.log(
      "\n ================================================================ \n" +
        "                                                                  \n" +
        "  [ webpack build ]                                               \n" +
        "                                                                  \n" +
        "   > server / public /                                            \n" +
        "                                                                  \n" +
        " ================================================================ \n"
    );
  }
  return isPugDir;
};
const webpackConfig_server = {
  mode: process.env.DEV_MODE,

  devServer: {
    // contentBase: `${DEV_SERVER_DIR}`,
    overlay: true,
    port: 3000,
    hot: true,
    inline: true,
    open: true,
    progress: true,
    stats: "errors-only",
  },

  devtool: "inline-source-map",
  // The side effect of this option is to increase build time
  // mode development ? ‘inline-source-map" : 'hidden-source-map’

  entry: {
    /*
      용도에 따라 js파일을 구분하고,
       js 파일을 html 페이지에 별로 청크를 분리하여 작성
       example1: path.resolve(__dirname, "src", "assets", "es6", "ex1.js")
       example2: path.resolve(__dirname, "src", "assets", "es6", "ex2.js"),
       각 호출 파일 내부에선 기능별 js를 import
      */

    // for prod
    index: path.resolve(__dirname, "src", "es6", "pages", "index.js"),

    // for dev_frontend
    __dev_bear: path.resolve(__dirname, "src", "es6", "pages", "__dev_bear.js"),
    __dev_wscrg: path.resolve(
      __dirname,
      "src",
      "es6",
      "pages",
      "__dev_wscrg.js"
    ),
  },

  output: {
    //  entry 에서 분리한 청크별로 다른 번들파일 출력
    path: DEV_SERVER_DIR,
    filename: "es5/[name].js", // 작업예약 200916: 청크해쉬 추가하고 html-webpack-plugin에서 지정하기!!
    publicPath: "./",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
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
              publicPath: "./",
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
      filename: "css/[name].css",
    }),
  ].concat(verifyPugDirBuild() ? [] : copyPugDir),
};

/* -- module.exports -- */
module.exports =
  BUNDLE_POINT === "frontend" ? webpackConfig_frontend : webpackConfig_server;
