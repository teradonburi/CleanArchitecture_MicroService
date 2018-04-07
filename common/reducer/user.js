// reducerで受け取るaction名を定義
const LOAD = 'user/LOAD'
const ADD = 'user/ADD'

// 初期化オブジェクト
const initialState = {
  users: null,
}

// reducerの定義（dispatch時にコールバックされる）
export default function reducer(state = initialState, action = {}) {
  // actionの種別に応じてstateを更新する
  switch (action.type) {
    case LOAD:
      // ユーザ一覧取得
      return {
        users: state.users ? state.users : action.results,
      }
    case ADD:
      // ユーザ一覧末尾にユーザを追加する
      return {
        users: state.users ? [...state.users, action.results] : [action.results],
      }
    default:
      // 初期化時はここに来る（initialStateのオブジェクトが返却される）
      return state
  }
}

// actionの定義
export function load() {
  // ユーザ一覧を取得
  return (dispatch, getState, client) => {
    return client
      .get('https://randomuser.me/api')
      .then(res => res.data)
      .then(data => {
        const results = data.results
        // dispatchしてreducer呼び出し
        dispatch({ type: LOAD, results })
      })
  }
}

export function add(user) {
  // 入力ユーザを追加
  return (dispatch) => {
    // 疑似ユーザ作成（本来はサーバ送信＆DB保存）
    const data = {'results': [{'gender': user.gender, 'name': {'first': user.firstname, 'last': user.lastname}, 'email': user.email, 'picture': {'thumbnail': 'https://avatars1.githubusercontent.com/u/771218?s=460&v=4'}}]}
    const results = data.results[0]
    // dispatchしてreducer呼び出し
    dispatch({ type: ADD, results })
    return Promise.resolve()
  }
}