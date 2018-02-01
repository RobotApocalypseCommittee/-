const express = require('express')
const path = require('path')
var hbs = require('express-hbs');
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render("index"))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
