import React from 'react'
import styled from 'styled-components'
import { withTheme } from 'material-ui/styles'
import { Avatar, CardContent } from 'material-ui'
import EmailButton from 'components/modules/EmailButton'
import StyledCard from 'components/atoms/StyledCard'

const UserList = ({theme, users, onClick}) => {
  const {primary, secondary} = theme.palette

  if (!users || users.length === 0) return null

  const Name = styled.p`
    && {
      margin: 10px;
      color: ${primary[500]}
    }`

  const Gender = styled.p`
    && {
      margin: 10px;
      color: ${secondary[500]}
    }`

  return users.map((user) => (
    // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
    <StyledCard key={user.email}>
      <CardContent>
        <Avatar src={user.picture.thumbnail} />
        <Name>{'名前:' + user.name.first + ' ' + user.name.last}</Name>
        <Gender>{'性別:' + (user.gender == 'male' ? '男性' : '女性')}</Gender>
        <div style={{textAlign: 'right'}} >
          <EmailButton onClick={() => onClick(user)} />
        </div>
      </CardContent>
    </StyledCard>
  ))
}

export default withTheme()(UserList)