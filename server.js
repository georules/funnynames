var settings = require('./settings')
var port = settings.port || 8080;
var env = settings.env || "dev";

var express = require('express')
var app = express()
  .use(express.json())
  .use(express.urlencoded())

function allow(itall) {
  itall.header("Access-Control-Allow-Origin","*")
}

app.get('/', function(req,res) {
  allow(res)
  res.send("hello from " + env + "!")
});

app.use(express.favicon('favicon.ico'));
//app.use(pageNotFound);

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
