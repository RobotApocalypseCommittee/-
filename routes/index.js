var express = require('express');
var router = express.Router();
var player = require('play-sound')(opts = {})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'βεκος' });
});



module.exports = router;
