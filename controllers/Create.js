var BaseController = require("./Base"),
  Rooms = require("../models/Rooms"),
  _ = require("lodash")
module.exports = BaseController.extend({
  name: "Create",
  content: {},
  run: function (req, res, next) {
    var self = this
    Rooms.setDB(req.db)

    // Satanize
    if (req.body['name'])
      req.sanitizeBody('name').trim();

    var roomName = _.camelCase(req.body['name'])
    roomName = roomName.toLowerCase(roomName)
    
    // Create the players
    var roomPlayers = []
    for (var i = 0; i < req.body['number']; i++) {
      roomPlayers.push({
        id: i,
        name: "unnamed",
        hp: 0,
      })
    }

    // Insert
    Rooms.insert({
      name: req.body['name'],
      id: roomName,
      players: roomPlayers,
      createdDate: new Date(),
    })
    res.redirect("/admin-room-" + roomName)
  }
})
