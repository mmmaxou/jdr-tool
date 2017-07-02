var _ = require("underscore");
module.exports = function (db) {
  this.db = db
};
module.exports.prototype = {
  extend: function (child) {
    return _.extend({}, this, child);
  },
  setDB: function (db) {
    this.db = db;
  },
}
