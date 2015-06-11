var express = require('express');
var router = express.Router();
var data = require('../data/about.json');

/* GET About Me page. */
router.get('/', function(req, res) {
  res.render('about', data);
});

module.exports = router;
