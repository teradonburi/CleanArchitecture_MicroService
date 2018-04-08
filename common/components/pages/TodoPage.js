import React from 'react'
import TodoPageUsecase from 'components/usecases/TodoPageUsecase'
import TodoPageTemplate from 'components/templates/TodoPageTemplate'

export default TodoPageUsecase()(({ handlePageMove, handleSubmit, sendItems, submitting }) => (
  <TodoPageTemplate
    headerContent='TODOページ'
    headerButtonTitle='ユーザページへ'
    onClickPageMove={() => handlePageMove('/')}
    handleSubmit={handleSubmit}
    sendItems={sendItems}
    disabled={submitting}
  />
))

