var express = require('express');
var router = express.Router();
var data = require('../data/news.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', data);
});

module.exports = router;
