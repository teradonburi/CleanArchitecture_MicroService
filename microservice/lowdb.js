const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// デフォルトUserデータをセット (JSOnファイルが空の場合)
db.defaults({ users: [
  {
    'id': '934441926',
    'age': 30,
    'gender': 'female',
    'name': {
      'title': 'ms',
      'first': 'georgia',
      'last': 'gregory',
    },
    'email': 'georgia.gregory@example.com',
    'picture': {
      'large': 'https://randomuser.me/api/portraits/women/39.jpg',
      'medium': 'https://randomuser.me/api/portraits/med/women/39.jpg',
      'thumbnail': 'https://randomuser.me/api/portraits/thumb/women/39.jpg',
    },
    'isPublic': true,
  },
]}).write()

module.exports = {
  index,
  show,
  create,
  update,
  remove,
}

function index() {
  return db.get('users')
    .value()
}

function show(id) {
  return db.get('users')
    .find({id})
    .value()
}

function create(data) {
  db.get('users')
    .push(data)
    .write()
}

function update(id, data) {
  db.get('posts')
    .find({id})
    .assign(data)
    .write()
}

function remove(id) {
  db.get('users')
    .remove({id})
    .write()
}
