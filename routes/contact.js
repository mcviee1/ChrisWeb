var debug = require('debug')('ChrisWeb');
var express = require('express');
var router = express.Router();
var data = require('../data/contact.json');
var nodemailer = require('nodemailer');

var form = require("express-form"),
    filter = form.filter,
    validate = form.validate;

// create reusable transport object using SMTP transport 
var mailTransport = nodemailer.createTransport({
    name: 'christineemcvie.com',
    //direct: true,
    debug: true,
    logger: true,
    host: data.email.smtpServer,
    port: data.email.smtpPort,
    secure: data.email.smtpUseSecure,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

/* GET Contact page. */
router.get('/', function(req, res) {
  res.render('contact', data);
});

router.post('/', 
  form( // Form filter and validation middleware
    filter('senderName').trim(),
    validate('senderName').required(),
    filter('senderEmail').trim(),
    validate('senderEmail').required().isEmail(),
    filter('subject').trim(),
    filter('message').trim(),
    validate('message').required()
  ),
  function(req, res) {
    if (!req.form.isValid) {
      // Handle errors
      debug(req.form.errors);
    } else {
      req.form.subject = req.form.subject || data.email.defaultSubject;
      // Or, use filtered form data from the form object:
      debug('Name:', req.form.senderName);
      debug('Email:', req.form.senderEmail);
      debug('Subject:', req.form.subject );
      debug('Message:', req.form.message);
      // Send Email
      var mailOptions = {
        from: req.form.senderName + ' <' + req.form.senderEmail + '>',
        to: data.contact.email,
        subject: req.form.subject,
        text: req.form.message
      };
      mailTransport.sendMail(mailOptions, function(error, info){
          if(error){
              debug(error);
          }else{
              debug('Message sent: ' + info.response);
          }
      });
    }
    res.render('contact', data);
  }
);

module.exports = router;