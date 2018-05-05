const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, '../common/proto/user.proto')
const Client = grpc.load(PROTO_PATH).user

const getClient = function (address) {
  return new Client(address, grpc.credentials.createInsecure())
}
const client = getClient('127.0.0.1:50051')

module.exports = {
  index,
  show,
  create,
  update,
  remove,
}

async function index() {
  return new Promise((resolve, reject) => {
    // get list
    client.index({}, function (err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res.users)
    })
  })
}

async function show(id) {
  return new Promise((resolve, reject) => {
    // get by id
    client.show({id}, function(err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

async function create(data) {
  return new Promise((resolve, reject) => {
    // insert
    client.create(data, function (err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

async function update(data) {
  return new Promise((resolve, reject) => {
    // update
    client.update(data, function (err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

async function remove(id) {
  return new Promise((resolve, reject) => {
    client.remove({id}, function (err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}
