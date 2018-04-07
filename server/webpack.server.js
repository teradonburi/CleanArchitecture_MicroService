/*globals module: false require: false __dirname: false */
const path = require('path')

module.exports = {
  mode: 'development', // 開発モード
  devtool: 'inline-source-map', // ソースマップファイル出力
  watch: true,  // 修正時に再ビルドする
  target: 'node', // NodeJS用ビルド
  entry: {
    ssr: [
      'babel-polyfill',
      path.join(__dirname, '/ssr.js'), // エントリポイントのjsxファイル
    ],
  },
  resolve: {
    alias: {
      common: path.join(__dirname, '../common'),
      components: path.join(__dirname, '../common/components'),
      reducer: path.join(__dirname, '../common/reducer'),
    },
  },
  name: 'ssr', // [name]に入る名前
  output: {
    path: __dirname, // serverフォルダに出力する
    filename: '[name].build.js', // 変換後のファイル名
    libraryTarget: 'commonjs2', // CommonJS形式で出力
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [__dirname, path.join(__dirname, '../common')], // 直下のJSファイルが対象
        exclude: [/node_modules/, /dist/ ], // node_modules, distフォルダ配下は除外
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true, // キャッシュディレクトリを使用する
            presets: [
              [
                'env', {
                  targets: {
                    node: '8.4', // NodeJS バージョン8.4
                  },
                  modules: false,
                  useBuiltIns: true, // ビルトイン有効
                },
              ],
              'stage-0', // stage-0のプラグイン
              'react',
            ],
            plugins: [
              ['direct-import', [
                'material-ui', // material-ui
                'redux-form',  // redux-form
              ]],
              'babel-plugin-transform-decorators-legacy', // decorator用
            ],
          },
        },
      },
    ],
  },
}

