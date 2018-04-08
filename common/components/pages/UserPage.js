import React from 'react'
import { connect } from 'react-redux'
import { load } from 'reducer/user'

import UserPageTemplates from 'components/templates/UserPageTemplate'

// connectのdecorator
@connect(
  // propsに受け取るreducerのstate
  state => ({
    users: state.user.users,
  }),
  // propsに付与するactions
  { load }
)
export default class UserPage extends React.Component {

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

    // 初回はnullが返ってくる（initialState）、処理完了後に再度結果が返ってくる
    // console.log(users)
    return <UserPageTemplates
      headerContent='ユーザページ(PC)'
      headerContentMobile='ユーザページ(スマホ)'
      headerButtonTitle='TODOページへ'
      users={users}
      onClickEmail={this.handleClickOpen}
      open={!!open}
      onCloseDialog={this.handleRequestClose}
      dialogTitle='メールアドレス'
      email={user ? user.email : null}
    />
  }
}