var BaseController = require("./Base"),
  Rooms = require("../models/Rooms"),
  _ = require('lodash')
module.exports = BaseController.extend({
  name: "Room",
  run: function (req, res, next) {
    Rooms.setDB(req.db)
    this.getRoom(req.params.id)
      .then(function (room) {
        res.render("room", {
          title: room.name,
          room: room,
          players: room.players,
        })
      })
      .catch(function (err) {
        console.error('Errors : ', err);
        res.render("room", {
          title: "Not found",
          room: null,
          players: null,
        })
      })
  },
  getRoom: function (id) {
    return new Promise(function (resolve, reject) {
      Rooms.getList({
        id: id
      }, function (err, docs) {
        if (err) {
          console.error("Error getting room list", err);
          reject("Error getting room list", err)
        } else {
          resolve(docs[0])
        }
      })
    })
  }
});
