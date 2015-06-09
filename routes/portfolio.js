var express = require('express');
var router = express.Router();

/* GET Portfolio page. */
router.get('/', function(req, res) {
  res.render('portfolio');
});

module.exports = router;
