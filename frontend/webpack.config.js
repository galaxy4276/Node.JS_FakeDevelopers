/* -- module -- */
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();
// const fs = require("fs");

/* -- plugin --*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/* -- MODE -- */
const BUNDLE_POINT = process.env.BUNDLE_POINT;

/* -- DIR_PATH -- */
const FRONT_BUILD_DIR = path.resolve(__dirname, "public");
const SERVER_BUILD_DIR = path.resolve(__dirname, `../server/src/public`);
const PUG_DIR = path.resolve(__dirname, "src", "views");

/* -- webpack_config -- */

// **** 신규 페이지 추가시에 이 곳에서 페이지 추가를 위한 작업 ****
// ** webpackConfig.entry 에 엔트리 JS 파일 경로 추가하기 **

// output 1: dev_client
const webpackConfig_frontend = {
  mode: process.env.DEV_MODE,

  devServer: {
    contentBase: FRONT_BUILD_DIR,
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
    path: FRONT_BUILD_DIR,
    filename: "es5/[name].js", // 작업예약 200916: 청크해쉬 추가하고 html-webpack-plugin에서 지정하기!!
    publicPath: "/",
    // publicPath: "http://localhost:8080/",
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
      filename: "css/[name].css",
    }),
  ],
};

// output 2: dev_server
const webpackConfig_server = {
  mode: process.env.DEV_MODE,

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

    // production
    index: path.resolve(__dirname, "src", "es6", "pages", "index.js"),

    // dev_frontend
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
    path: SERVER_BUILD_DIR,
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
    new CopyWebpackPlugin({
      patterns: [{ from: PUG_DIR, to: SERVER_BUILD_DIR + "/views" }],
    }),
  ],
};

/* -- module.exports -- */
module.exports =
  BUNDLE_POINT === "frontend" ? webpackConfig_frontend : webpackConfig_server;

const BUNDLE_POINT_LOG = () => {
  BUNDLE_POINT === "frontend"
    ? console.log(
        "\n ================================================================ \n" +
          "                                                                  \n" +
          "  [ webpack build ]                                               \n" +
          "                                                                  \n" +
          "   > frontend / public /                                            \n" +
          "                                                                  \n" +
          " ================================================================ \n"
      )
    : console.log(
        "\n ================================================================ \n" +
          "                                                                  \n" +
          "  [ webpack build ]                                               \n" +
          "                                                                  \n" +
          "   > server / public /                                            \n" +
          "                                                                  \n" +
          " ================================================================ \n"
      );
};
BUNDLE_POINT_LOG();
