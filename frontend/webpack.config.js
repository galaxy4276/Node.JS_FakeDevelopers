const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MODE = "development";
const OUTPUT_DIR = path.resolve(__dirname, "build");

// pug에서 html로 컴파일을 해주면 그 html에 스크립트 코드를 추가하는 함수
// 아래 html-webpack-plugin 플러그인에서 이 함수 사용
let htmlPageNames = ["index", "foobar", "fooooo"]; // index는 따로 처리
let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `${OUTPUT_DIR}/html/${name}.html`, // relative path to the HTML files
    filename: `html/${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    // html 파일별 요구하는 스크립트에 따라 청크를 분리하여 아웃풋에서 출력된 청크 이름을 chunks에 기입
  });
});

module.exports = {
  mode: MODE,

  devServer: {
    hot: true,
    inline: true,
    open: true,
    overlay: true,
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
  ].concat(multipleHtmlPlugins), // pug에서 컴파일되어 나온 html 파일별로 스크립트 코드 주입하여 출력
};

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//   }
//   if (argv.mode === "production") {
//   }
//   return config;
// };
