import React from 'react'
import { connect } from 'react-redux'
import { load } from 'reducer/user'

// 引数
export default () => {
  // WrapするReact Component引数
  return (WrappedComponent) => {
    // 処理をフックする
    return connect(
      // propsに受け取るreducerのstate
      state => ({
        users: state.user.users,
      }),
      // propsに付与するactions
      { load }
    )(class extends React.Component {

      constructor (props) {
        super(props)
        this.state = {
          open: false,
          user: null,
        }
      }

      componentDidMount() {
        // user取得APIコールのactionをキックする
        this.props.load()
      }

      handleClickOpen = (user) => {
        this.setState({
          open: true,
          user: user,
        })
      }

      handleRequestClose = () => {
        this.setState({ open: false })
      }

      handlePageMove = (path) => {
        this.props.history.push(path)
      }

      render () {
        const { users } = this.props
        const { open, user } = this.state

        // propsにinject属性追加
        return <WrappedComponent
          {...this.props}
          users={users}
          open={open}
          user={user}
          handleClickOpen={this.handleClickOpen}
          handleRequestClose={this.handleRequestClose}
          handlePageMove={this.handlePageMove}
        />
      }
    })

  }
}