const express = require('express')
const app = express()

// webpackでbuild済みのSSRモジュールを読み込む
const ssr = require('./ssr.build').default

let bundles = []
if (process.env.NODE_ENV === 'dev') {
  // webpack-dev-serverのbundle.jsにredirect
  app.get('/bundle.js', (req, res) => res.redirect('http://localhost:8080/bundle.js'))
} else if (process.env.NODE_ENV === 'production') {
  const jsdom = require('jsdom')
  const { JSDOM } = jsdom
  // distフォルダをホスティング
  app.use(express.static('dist'))
  // distのtemplate.htmlのbundle.jsパスを取得
  JSDOM.fromFile(__dirname + '/dist/template.html').then(dom => {
    const document = dom.window.document
    const scripts = document.querySelectorAll('script[type="text/javascript"]')
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i]
      if (s.src.indexOf('bundle.js') !== -1 || s.src.indexOf('core.js') !== -1 || s.src.indexOf('react.js') !== -1) {
        bundles.push(s.src.replace('file:///', '/'))
      }
    }
    console.log(bundles)
  })
  app.all('*', (req, res, next) => {
    req.bundles = bundles
    next()
  })
}

app.get('/', (req, res) => {
  // redux storeに代入する初期パラメータ、各ページの初期ステートと同じ構造にする
  const initialData = {
    user: {
      users: null,
    },
  }
  ssr(req, res, initialData)
})

app.get('/todo', (req, res) => {
  const initialData = {}
  ssr(req, res, initialData)
})


app.listen(8000, function () {
  console.log('app listening on port 8000')
})

// 例外ハンドリング
process.on('uncaughtException', (err) => console.log('uncaughtException => ' + err))
process.on('unhandledRejection', (err) => console.log('unhandledRejection => ' + err))
