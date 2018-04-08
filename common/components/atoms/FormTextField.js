import React from 'react'
import { TextField } from 'material-ui'
import { Field } from 'redux-form'
import styled from 'styled-components'

const StyledTextField = styled(TextField)`
  && {
    margin-right: 10px;
  }
`

const TextFieldComponent = ({
  input,
  label,
  type,
  meta: { touched, error },
  style,
}) => {
  const isError = !!(touched && error)
  return (
    <StyledTextField style={style} error={isError} label={label} helperText={isError ? error : null} {...input} type={type} />
  )
}

const FormTextField = ({name, label}) => (
  <Field name={name} type='text' component={TextFieldComponent} label={label} />
)

export default FormTextField