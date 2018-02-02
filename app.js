const express = require('express')
const path = require('path')
var hbs = require('express-hbs');
var Chance = require('chance');
var chance = new Chance();
var effects = require("./effects.json");
const PORT = process.env.PORT || 5000

const app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render("index"))

app.get('/audio', function(req, res){
  if (req.query.format == "json"){
    var resp = []
    for (var i = 0; i < effects.length; i++) {
      resp.push(effects[i].path)
    }
    res.json(resp);
  } else {
    var msg = ""
    for (var i = 0; i < effects.length; i++) {
      msg += i+","+effects[i].path+"\n";
    }
    res.send(msg)
  }
  
  
})

function get_random_index() {
  var paths = []
  var probabilities = []
  for (var i = 0; i < effects.length; i++) {
    var file = effects[i]
    paths.push(file.path)
    probabilities.push(file.probability)
  }
  var chosenpath = chance.weighted(paths, probabilities)
  var chosenindex = paths.indexOf(chosenpath)
  return chosenindex
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.lastBekos = Date.now();
  socket.on('BEKOS', function(name){
    if ((Date.now() - socket.lastBekos) > 2000 ) {
      if (name) {
        var msg = name+ " did a βεκος"
      } else {
        var msg = "Someone did a βεκος"
      }
      obj = {"message": msg, "sound":get_random_index()}
      socket.lastBekos = Date.now()
      io.emit('BEEKOS', obj);
    }
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

http.listen(PORT, () => console.log('Example app listening on port ' + PORT))
