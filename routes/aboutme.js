var express = require('express');
var router = express.Router();

/* GET About Me page. */
router.get('/', function(req, res) {
  res.render('aboutme');
});

module.exports = router;
