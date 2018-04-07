import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from 'reducer/user'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
})