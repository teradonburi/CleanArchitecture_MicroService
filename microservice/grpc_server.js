const grpc = require('grpc')
const path = require('path')
const PROTO_PATH = path.join(__dirname, '../common/proto/user.proto')
const user = grpc.load(PROTO_PATH).user
const lowdb = require('./lowdb')

// 例外ハンドリング
process.on('uncaughtException', (err) => console.log('uncaughtException => ' + err))
process.on('unhandledRejection', (err) => console.log('unhandledRejection => ' + err))

// UserのCRUDを行うマイクロサービス
class User {
  index (call, callback) {
    const datas = lowdb.index()
    console.log(datas)
    return callback(null, datas)
  }
  show (call, callback) {
    const data = lowdb.show(call.request.id)
    if (data) {
      console.log(data)
      return callback(null, data)
    }
    return callback('Can not find user.')
  }
  create (call, callback) {
    const newUser = Object.assign({}, call.request)
    console.log(`create ${newUser}`)
    lowdb.create(newUser)
    return callback(null, newUser)
  }
  update (call, callback) {
    if (!call.request.id) {
      return callback('User id can not find.')
    }
    const user = Object.assign({}, call.request)
    console.log(`uddate ${user}`)
    lowdb.update(call.request.id, user)
    return callback(null, call.request)
  }
  remove (call, callback) {
    if (!call.request.id) {
      return callback('User id can not find.')
    }
    console.log(`remove ${call.request.id}`)
    lowdb.remove(call.request.id)
    return callback(null)
  }
}

const getServer = function (service, serviceCall, listener) {
  const server = new grpc.Server()
  server.addService(service, serviceCall)
  server.bind(listener, grpc.ServerCredentials.createInsecure())
  return server
}

// gRPCサーバ起動
const articleServer = getServer(user.service, new User, '0.0.0.0:50051')
articleServer.start()
console.log('gRPC listening on port 50051')