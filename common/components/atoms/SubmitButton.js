import React from 'react'
import styled from 'styled-components'
import {Button} from 'material-ui'

const StyledButton = styled(Button)`
  && {
    margin-top: 10;
  }
`

const SubmitButton = ({disabled}) => (
  <StyledButton variant='raised' type='submit' disabled={disabled}>送信</StyledButton>
)

export default SubmitButton