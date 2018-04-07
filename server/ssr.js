import React from 'react'
// SSR用ライブラリ
import ReactDOMServer from 'react-dom/server'
// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// Material-UI SSR
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles'
// React Router
import { StaticRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
// reducer
import reducer from 'reducer/reducer'
// material-ui theme
import theme from 'common/theme'

// クライアントサイドと同じComponentを使う
import UserPage from 'components/UserPage'
import TodoPage from 'components/TodoPage'


export default function ssr(req, res, initialData) {
  console.log('------------------ssr------------------')
  const context = {}
  // Material-UIの初期化
  const sheetsRegistry = new SheetsRegistry()
  const generateClassName = createGenerateClassName({productionPrefix: 'mm'})

  // Redux Storeの作成(initialDataには各Componentが参照するRedux Storeのstateを代入する)
  const store = createStore(reducer, initialData, applyMiddleware(thunk))


  const body = () => (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          {/* ここでurlに対応するReact RouterでComponentを取得 */}
          <StaticRouter location={req.url} context={context}>
            <Switch>
              <Route exact path="/" component={UserPage} />
              <Route path="/todo" component={TodoPage} />
            </Switch>
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  )

  // htmlを生成
  ReactDOMServer.renderToNodeStream(
    <HTML
      bundles={req.bundles}
      style={sheetsRegistry.toString()} // Material-UIのスタイルをstyleタグに埋め込む
      initialData={initialData}
    >
      {body}
    </HTML>
  ).pipe(res)

}

const HTML = (props) => {
  return (
    <html lang='ja'>
      <head>
        {/* ここでmetaタグの切り替えやAMP用のhtml出力の切り替えを行う、今回は具体例は省略 */}
        <meta charSet="utf-8" />
        <title>learnReactJS</title>
        <style>{props.style}</style>
      </head>
      <body>
        <div id='root'>{props.children}</div>
        <script id='initial-data' type='text/plain' data-json={JSON.stringify(props.initialData)}></script>
        {
          props.bundles ?
            props.bundles.map(bundle => <script key={bundle} type='text/javascript' src={bundle}></script>)
            :
            <script type='text/javascript' src='/bundle.js'></script>
        }
      </body>
    </html>
  )
}