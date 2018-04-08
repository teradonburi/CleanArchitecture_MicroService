import React from 'react'
import { connect } from 'react-redux'
import { add } from 'reducer/user'
import { reduxForm } from 'redux-form'

// 引数
export default () => {
  // WrapするReact Component引数
  return (WrappedComponent) => {
    // 処理をフックする
    return connect(
      // propsに受け取るreducerのstate
      () => ({}),
      // propsに付与するactions
      { add }
    )(reduxForm({
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
    })(class extends React.Component {

      constructor(props) {
        super(props)
        this.sendItems = this.sendItems.bind(this)
      }

      handlePageMove = (path) => {
        this.props.history.push(path)
      }

      sendItems = (values) => {
        const user = {
          firstname: values.firstname,
          lastname: values.lastname,
          gender: values.gender || 'male',
          email: values.email,
        }
        this.props.add(user).then(() => alert('送信完了')) // sendItemsメソッド内でthisを使えるようにbindする
      }

      render () {
        const { handleSubmit, submitting } = this.props

        // propsにinject属性追加
        return <WrappedComponent
          {...this.props}
          handlePageMove={this.handlePageMove}
          handleSubmit={handleSubmit}
          sendItems={this.sendItems}
          submitting={submitting}
        />
      }
    }))

  }
}