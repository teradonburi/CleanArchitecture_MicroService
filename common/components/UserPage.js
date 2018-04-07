import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { load } from 'reducer/user'

import { withTheme, withStyles } from 'material-ui/styles'
import { Hidden, AppBar, Toolbar, Avatar, Card, CardContent, Button, Dialog, DialogTitle, DialogContent } from 'material-ui'
import { Email } from 'material-ui-icons'
import { orange } from 'material-ui/colors'

const StyledButton = styled(Button)`
  && {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
  }
`

// connectのdecorator
@connect(
  // propsに受け取るreducerのstate
  state => ({
    users: state.user.users,
  }),
  // propsに付与するactions
  { load }
)
@withTheme()
@withStyles({
  root: {
    fontStyle: 'italic',
    fontSize: 21,
    minHeight: 64,
  },
})
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

  handleClickOpen (user) {
    this.setState({
      open: true,
      user: user,
    })
  }

  handleRequestClose () {
    this.setState({ open: false })
  }

  handlePageMove(path) {
    this.props.history.push(path)
  }

  render () {
    const { users, theme, classes } = this.props
    const { primary, secondary } = theme.palette

    // 初回はnullが返ってくる（initialState）、処理完了後に再度結果が返ってくる
    // console.log(users)
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar classes={{root: classes.root}}>
            <Hidden xsDown>
              ユーザページ(PC)
            </Hidden>
            <Hidden smUp>
              ユーザページ(スマホ)
            </Hidden>
            <Button style={{color: '#fff', position: 'absolute', top: 15, right: 0}} onClick={() => this.handlePageMove('/todo')}>TODOページへ</Button>
          </Toolbar>
        </AppBar>
        {/* 配列形式で返却されるためmapで展開する */}
        {users && users.map((user) => {
          return (
            // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
            <Card key={user.email} style={{marginTop: '10px'}}>
              <CardContent style={{color: '#408040'}}>
                <Avatar src={user.picture.thumbnail} />
                <p style={{margin: 10, color: primary[500]}}>{'名前:' + user.name.first + ' ' + user.name.last} </p>
                <p style={{margin: 10, color: secondary[500]}}>{'性別:' + (user.gender == 'male' ? '男性' : '女性')}</p>
                <div style={{textAlign: 'right'}} >
                  <StyledButton onClick={() => this.handleClickOpen(user)}><Email style={{marginRight: 5, color: orange[200]}}/>メールする</StyledButton>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {
          this.state.open &&
          <Dialog open={this.state.open} onClose={() => this.handleRequestClose()}>
            <DialogTitle>メールアドレス</DialogTitle>
            <DialogContent>{this.state.user.email}</DialogContent>
          </Dialog>
        }
      </div>
    )
  }
}