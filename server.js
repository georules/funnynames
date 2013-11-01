var settings = require('./settings')
var port = settings.port || 8080;
var env = settings.env || "development";
var mongo = require('mongoskin')
var db = mongo.db(settings.mongo)

var names = db.collection("names")
var hits = db.collection("hits")

var express = require('express')
var app = express()
  .use(express.json())
  .use(express.urlencoded())

function allow(itall) {
  itall.header("Access-Control-Allow-Origin","*")
}

app.get('/', function(req,res) {
  allow(res)
  hits.save({}, function (e,r) { if (e) console.log(e)})
  hits.count({}, function (e,r) {
    res.send("hello from " + env + "!"+"<br>"+r)
  })
});

app.use(express.favicon('favicon.ico'));
//app.use(pageNotFound);

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
