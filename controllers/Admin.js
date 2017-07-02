var BaseController = require("./Base"),
  Rooms = require("../models/Rooms"),
  _ = require('lodash')
module.exports = BaseController.extend({
  name: "Admin",
  run: function (req, res, next) {
    this.getRooms()
      .then(function (rooms) {
        res.render("admin", {
          title: 'Administration',
          rooms: rooms
        });
      })
  },
  room: function (req, res, next) {
    Rooms.setDB(req.db)
    this.getRoomID(req.params.id)
      .then(function (room) {
        res.render("admin-room", {
          title: 'Administration',
          room: room,
          players: room.players,
        })
      })
      .catch(function (err) {
        console.error('Errors : ', err);
      })
  },

  getRoomID: function (id) {
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
  },
  getRooms: function (id) {
    return new Promise(function (resolve, reject) {
      Rooms.getList({}, function (err, docs) {
        if (err) {
          console.error("Error getting room list", err);
          reject("Error getting room list", err)
        } else {
          resolve(docs)
        }
      })
    })
  }
});
