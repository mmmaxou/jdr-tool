var Model = require("./Base"),
  model = new Model();
var ContentModel = model.extend({
  insert: function (data, callback) {
    this.collection().insert(data, {}, callback || function () {});
  },
  update: function (query, data, callback) {
    this.collection().update(query, data, {}, callback || function () {});
  },
  getList: function (query, callback) {
    this.collection().find(query || {}).toArray(callback);
  },
  remove: function (query, callback) {
    this.collection().findAndModify(query, [], {}, {
      remove: true
    }, callback);
  },
  collection: function () {
    return this.db.collection("rooms");
  }
});
module.exports = ContentModel;
