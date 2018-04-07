import React from 'react'

// 遅延レンダリングを行うコンポーネント
export default (loader, collection) => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.Component = null
      this.state = { Component: AsyncComponent.Component }
    }

    componentWillMount() {
      // 遅延して読み込み完了させる
      setTimeout(() => this.setState({startProgress: true}), 500)
      if (!this.state.Component) {
        loader()
          .then(module => module.default) // export defaultされたコンポーネント
          .then(Component => {
            // コンポーネントを遅延読み込みしたものに差し替え
            AsyncComponent.Component = Component
            this.setState({ Component })
          })
      }
    }

    render() {
      if (this.state.Component) {
        // Wrapしたコンポーネントをレンダリングする
        return <this.state.Component { ...this.props } { ...collection } />
      }

      if (!this.state.startProgress) {
        return null
      }

      return <div>Now Loading...</div>
    }
  }
)
