import React from 'react'
import { Field } from 'redux-form'

const FormSelect = ({name, children}) => (
  <Field name={name} component='select'>
    {children}
  </Field>
)

export default FormSelect