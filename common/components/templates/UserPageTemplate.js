import React from 'react'

import Header from 'components/organisms/Header'
import UserList from 'components/organisms/UserList'
import Diag from 'components/organisms/Diag'

const UserPageTemplate = ({
  headerContent, headerContentMobile, headerButtonTitle,
  users, onClickEmail,
  open, onCloseDialog, dialogTitle, email,
}) => (
  <div>
    <Header
      content={headerContent}
      contentMobile={headerContentMobile}
      buttonTitle={headerButtonTitle}
    />
    <UserList
      users={users}
      onClick={onClickEmail}/>
    <Diag
      open={!!open}
      onClose={onCloseDialog}
      title={dialogTitle}
      content={email}
    />
  </div>
)

export default UserPageTemplate
