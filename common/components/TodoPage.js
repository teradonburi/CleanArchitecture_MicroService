import React from 'react'
import { connect } from 'react-redux'
import { add } from 'reducer/user'

import { withStyles } from 'material-ui/styles'
import { AppBar, Toolbar, Card, Button, TextField } from 'material-ui'
import { Field, reduxForm } from 'redux-form'

const FormTextField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => {
  const isError = !!(touched && error)
  return (
    <TextField style={{margin: 5}} error={isError} label={label} helperText={isError ? error : null} {...input} type={type} />
  )
}

// connectのdecorator
@connect(
  // propsに受け取るreducerのstate
  () => ({}),
  // propsに付与するactions
  { add }
)
@reduxForm({
  form: 'syncValidation',
  validate: values => {

    // 入力変更時にパラメータが渡ってくる
    const errors = {}
    if (!values.firstname) {
      errors.firstname = '必須項目です'
    }
    if (!values.lastname) {
      errors.lastname = '必須項目です'
    }
    if (!values.email) {
      errors.email = '必須項目です'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'メールアドレスとして認識できません'
    }

    return errors
  },
})
@withStyles({
  root: {
    fontStyle: 'italic',
    fontSize: 21,
    minHeight: 64,
  },
})
export default class TodoPage extends React.Component {

  constructor(props) {
    super(props)
    this.sendItems = this.sendItems.bind(this)
  }

  handlePageMove(path) {
    this.props.history.push(path)
  }

  sendItems(values) {
    const user = {
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender || 'male',
      email: values.email,
    }
    this.props.add(user).then(() => alert('送信完了')) // sendItemsメソッド内でthisを使えるようにbindする
  }

  render () {
    const { classes, handleSubmit, submitting } = this.props

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar classes={{root: classes.root}}>
            TODOページ
            <Button style={{color: '#fff', position: 'absolute', top: 15, right: 0}} onClick={() => this.handlePageMove('/')}>ユーザページへ</Button>
          </Toolbar>
        </AppBar>
        <Card style={{padding: 10}}>
          <form onSubmit={handleSubmit(this.sendItems)}>
            <Field name="firstname" type="text" component={FormTextField} label="姓" />
            <Field name="lastname" type="text" component={FormTextField} label="名" />
            <div style={{margin: 5}}>
              <label style={{marginRight: 5}}>性別：</label>
              <span>
                <Field name="gender" component="select">
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </Field>
              </span>
            </div>
            <Field name="email" type="email" component={FormTextField} label="メールアドレス" />
            <br/>
            <Button style={{marginTop: 10}} variant='raised' type="submit" disabled={submitting}>送信</Button>
          </form>
        </Card>
      </div>
    )
  }
}