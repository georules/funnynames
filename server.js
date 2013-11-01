var settings = require('./settings')
var express = require('express')
var app = express()
  .use(express.json())
  .use(express.urlencoded())

function allow(itall) {
  itall.header("Access-Control-Allow-Origin","*")
}

app.get('/', function(req,res) {
  allow(res)
  res.send("hello!")
});

app.use(express.favicon('favicon.ico'));
//app.use(pageNotFound);

app.listen(settings.port, function() {
  console.log('Listening on port ' + settings.port)
})
