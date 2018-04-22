/*globals module: false require: false __dirname: false */
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 開発モード
  devtool: 'cheap-module-source-map', // ソースマップファイル出力
  entry: [
    'babel-polyfill', // babelのpolyfill設定
    'react-hot-loader/patch',
    path.join(__dirname, '/index'), // エントリポイントのjsxファイル
  ],
  resolve: {
    alias: {
      common: path.join(__dirname, '../common'),
      components: path.join(__dirname, '../common/components'),
      reducer: path.join(__dirname, '../common/reducer'),
    },
  },
  // React Hot Loader用のデバッグサーバ(webpack-dev-server)の設定
  devServer: {
    contentBase: path.join(__dirname, '../static'), // template.htmlの格納場所
    historyApiFallback: true, // history APIが404エラーを返す場合にtemplate.htmlに飛ばす
    inline: true, // ソース変更時リロードモード
    hot: true, // HMR(Hot Module Reload)モード
    port: 7070, // 起動ポート,
    publicPath: '/',
    proxy: {
      '**': {
        target: 'http://0.0.0.0:6000',
        secure: false,
        logLevel: 'debug',
      },
    },
  },
  output: {
    publicPath: '/', // 公開パスの指定
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'template.html', // 出力ファイル名
      template: '../static/template.html', // template対象のtemplate.htmlのパス
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR(Hot Module Reload)プラグイン利用
    // autoprefixerプラグイン利用、cssのベンダープレフィックスを自動的につける
    new webpack.LoaderOptionsPlugin({options: {
      postcss: [precss, autoprefixer({browsers: ['last 2 versions']})],
    }}),
  ],
  module: {
    rules: [{
      test: /\.js?$/, // 拡張子がjsで
      include: [__dirname, path.join(__dirname, '../common')], // 直下のJSファイルが対象
      exclude: [/node_modules/, /dist/ ], // node_modules, distフォルダ配下は除外
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', '> 1%'],
                },
                modules: false,
                useBuiltIns: true,
              },
            ],
            'react',
            'stage-0',
          ],
          plugins: ['react-hot-loader/babel', 'transform-class-properties', 'transform-decorators-legacy'],
        },
      },
    }],
  },
}