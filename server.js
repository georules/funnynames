var settings = require('./settings')
var port = settings.port || 8080;
var env = settings.env || "development";
var mongo = require('mongoskin')
var db = mongo.db(settings.mongo)
db.bind('names')

var S = require('string');

var express = require('express')
var app = express()
  .use(express.json())
  .use(express.urlencoded())
  .use('/static', express.static(__dirname+'/static'))
  .use(express.favicon('/static/favicon.ico'))

function allow(itall) {
  itall.header("Access-Control-Allow-Origin","*")
}

function mainWeb(req,res) {
  res.sendfile('./static/index.html')
}

app.get('/', mainWeb)

app.post('/', function(req,res) {
  allow(res)
  name = S(req.body.datname).stripTags().s
  db.names.save({name: name}, mainWeb(req,res))   
})

app.get('/api', function(req,res) {
  allow(res)
  db.names.count({}, function (e,r) {
    numnames=r
    if(numnames === 0) {
      res.send("Scruffy")
    }
    else {
      pick = Math.floor(Math.random()*numnames)
      db.names.find().limit(-1).skip(pick).toArray(function (e,r)  {
        if (r.length > 0) res.send(r[0])
        else  res.send("Scruffy")
      })
    }
  })
})

app.get('/api/all', function(req,res)  {
  db.names.find().toArray(function(e,r)  {
    res.send(r)
  })
})

// Get dat app going
app.listen(port, function() {
  console.log('Listening on port ' + port)
})
