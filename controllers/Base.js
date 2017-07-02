var _ = require("underscore");
module.exports = {
  name: "base",
  extend: function (child) {
    return _.extend({}, this, child);
  },
  run: function (req, res, next) {

  },
  isAjax: function(req, res, next) {
    return req.query.p === "true"
  },
  userData: function (req) {
    return {
      connected: req.cookies.connected,
      username: req.cookies.username,
    }
  },
  isConnected: function(req) {
    var c = req.cookies
    if ( c.connected && c.username && c.password) {
      return true
    } else {
      return false
    }
  }
}
