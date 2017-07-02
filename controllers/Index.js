var BaseController = require("./Base"),
  Rooms = require("../models/Rooms");
module.exports = BaseController.extend({
  name: "Index",
  content: {},
  run: function (req, res, next) {
    Rooms.setDB(req.db);
    var self = this;
    this.getRooms()
      .then(function (rooms) {
        res.render("index", {
          title: 'JDR Tools',
          rooms: rooms
        });
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
