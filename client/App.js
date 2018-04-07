/*globals module: false require: false */
import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import asyncComponent from 'components/AsyncComponent'

// 遅延レンダリング
// magicコメントでwebpackが勝手にファイル名をリネームするのを防ぐ
const UserPage = asyncComponent(() => import(/* webpackChunkName: 'userpage' */ 'components/UserPage'))
const TodoPage = asyncComponent(() => import(/* webpackChunkName: 'todopage' */ 'components/TodoPage'))
const NotFound = asyncComponent(() => import(/* webpackChunkName: 'notfound' */ 'components/NotFound'))

// ReactHotLoader時は全部読み込んでしまう
if (module.hot) {
  require('components/UserPage')
  require('components/TodoPage')
  require('components/NotFound')
}

export default class App extends React.Component {
  render() {
    const { history } = this.props
    return (
      <Router history={history}>
        <Route component={AppRoute} />
      </Router>
    )
  }
}

const AppRoute = () => (
  <Switch>
    <Route exact path="/" component={UserPage} />
    <Route path="/todo" component={TodoPage} />
    {/* それ以外のパス */}
    <Route component={NotFound} />
  </Switch>
)