import React from 'react'
import { orange } from 'material-ui/colors'
import { Email } from 'material-ui-icons'
import StyledButton from 'components/atoms/StyledButton'
import styled from 'styled-components'

const StyledEmail = styled(Email)`
  && {
    marginRight: 5;
    color: ${orange[200]};
  }
`

const EmailButton = ({onClick}) => (
  <StyledButton onClick={onClick}><StyledEmail/>メールする</StyledButton>
)

export default EmailButton
