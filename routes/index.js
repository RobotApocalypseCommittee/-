var express = require('express');
var router = express.Router();
var player = require('play-sound')(opts = {})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'βεκος' });
});

var playSound = player.play('../alert.mp3', { timeout: 300 }, function(err){
  if (err) throw err
})

module.exports = router;
