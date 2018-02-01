const express = require('express')
const path = require('path')
var hbs = require('express-hbs');
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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

http.listen(PORT, () => console.log('Example app listening on port ' + PORT))
