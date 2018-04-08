import React from 'react'

import UserPageUsercase from 'components/usecases/UserPageUsecase'
import UserPageTemplates from 'components/templates/UserPageTemplate'

export default UserPageUsercase()(({ users, open, user, handleClickOpen, handleRequestClose, handlePageMove }) =>
  <UserPageTemplates
    headerContent='ユーザページ(PC)'
    headerContentMobile='ユーザページ(スマホ)'
    headerButtonTitle='TODOページへ'
    onClickPageMove={() => handlePageMove('/todo')}
    users={users}
    onClickEmail={handleClickOpen}
    open={!!open}
    onCloseDialog={handleRequestClose}
    dialogTitle='メールアドレス'
    email={user ? user.email : null}
  />
)