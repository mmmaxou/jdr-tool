module.exports = function (server, db) {
  // module dep
  var io = require('socket.io')(server),
    Rooms = require('./models/Rooms')
  Rooms.setDB(db)

  io.on('connection', function (socket) {
    console.log('New connection');
    socket.on('change', function (data) {
      socket.broadcast.emit('change', data)
      console.log('data:', data);
      
      var $set = {}
      $set["players.$."+data.selector] = data.new
      console.log('$set:', $set);

      Rooms.update({
        "id": data.roomId,
        "players.id": Number(data.id),
      }, {
        $set: $set
      }, function (err, docs) {
        console.log('docs:', docs.result);
      })
    })
    
    socket.on('mod', function (data) {
      console.log('data:', data);
      socket.broadcast.emit('mod', data)
      var $set = {}
      $set["players.$.mod."+data.selector] = data.new
      console.log('$set:', $set);

      Rooms.update({
        "id": data.roomId,
        "players.id": Number(data.id),
      }, {
        $set: $set
      }, function (err, docs) {
        console.log('docs:', docs.result);
      })
    })
    
    socket.on('object', function (data) {
      console.log('data:', data);
      socket.broadcast.emit('object', data)
      var $set = {}
      $set["players.$."+data.selector] = data.new
      console.log('$set:', $set);

      Rooms.update({
        "id": data.roomId,
        "players.id": Number(data.id),
      }, {
        $set: $set
      }, function (err, docs) {
        console.log('docs:', docs.result);
      })
    })
    
  })

  return io
}
