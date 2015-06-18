var express = require('express');
var router = express.Router();
var data = require('../data/contact.json');

/* GET Contact page. */
router.get('/', function(req, res) {
  res.render('contact', data);
});

module.exports = router;