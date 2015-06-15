var express = require('express');
var router = express.Router();
var data = require('../data/portfolio.json');

/* GET Portfolio page. */
router.get('/', function(req, res) {
  res.render('portfolio', data);
});

module.exports = router;
