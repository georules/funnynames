var config = {
  port: 8080,
  env: process.env.NODE_ENV,
  mongo: "mongodb://localhost:27017/names"
}
 /* mongo: {
    user:"", pass:"",server:"localhost",
    port:27017,db:"names"
  }
*/

if (config.env === 'production')  {
  user = process.env.MONGO_USER
  pass = process.env.MONGO_PASS
  config.mongo = "mongodb://"+user+":"+pass+"@ds045988.mongolab.com:45988/nodejitsu_georules_nodejitsudb4637748226"
}

module.exports = config
