var config = {
  local: {
    mode: 'local',
    port: 3000,
    folder: '../src/'
  },
  staging: {
    mode: 'staging',
    port: 4000
  },
  production: {
    mode: 'production',
    port: 5000
  },
  mongo: {
    user: 'mmmaxou',
    pass: 'azeazeaze1',
    host: 'ds147072.mlab.com:47072',
    dbname: 'jdr-tool'
  },
}
var m = config.mongo
config.mongo.url = 'mongodb://' + m.user + ':' + m.pass + '@' + m.host + '/' + m.dbname
module.exports = function (mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
}
