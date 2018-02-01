const express = require('express')
const path = require('path')
var hbs = require('express-hbs');
var Chance = require('chance');
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
  var msg = ""
  for (var i = 0; i < effects.length; i++) {
    msg += i+","+effects[i].path+"\n";
  }
  res.end(msg)
  
  
})

function get_random_index() {
  var paths = []
  var probabilities = []
  for (file in effects) {
    paths.append(file.path)
    probabilities.append(file.probability)
  }
  var chosenpath = Chance.weighted(paths, probabilities)
  var chosenindex = paths.indexOf(chosenpath)
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('BEKOS', function(name){
    if (name) {
      var msg = name+ " did a βεκος"
    } else {
      var msg = "Someone did a βεκος"
    }
    io.emit('BEEKOS', msg);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

http.listen(PORT, () => console.log('Example app listening on port ' + PORT))
