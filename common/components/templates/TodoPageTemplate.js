import React from 'react'
import Header from 'components/organisms/Header'
import UserRegist from 'components/organisms/UserRegist'

const UserPageTemplate = ({
  headerContent, headerButtonTitle, onClickPageMove,
  handleSubmit, sendItems, disabled,
}) => (
  <div>
    <Header
      content={headerContent}
      buttonTitle={headerButtonTitle}
      onClickPageMove={onClickPageMove}
    />
    <UserRegist
      handleSubmit={handleSubmit}
      sendItems={sendItems}
      disabled={disabled}
    />
  </div>
)

export default UserPageTemplate
