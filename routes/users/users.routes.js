var express = require('express');
var router = express.Router();
var controller = require('./users.controller');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  controller.register(req.body).then(result => {
    return res.status(200).send({
      success: true,
      error: null,
      msg: 'Registered'
    });
  }, err => {
    res.status(500).send({
      success: false,
      error: 'internal server error',
      msg: err
    });
  });
});

router.post('/login', function(req, res, next) {
  controller.login(req.body).then(result => {
    if (result === 'incorrectPassword') {
      return res.status(403).send({
        success: false,
        error: null,
        msg: 'incorrect Password'
      });
    } else if (result === 'userNotFound') {
      return res.status(404).send({
        success: false,
        error: null,
        msg: 'No user registered with this email'
      });
    } else {
      return res.status(200).send({
        success: true,
        error: null,
        msg: 'signed in success'
      });
    }
  }, err => {
    return res.status(500).send({
      success: false,
      error: 'internal server error',
      msg: err
    });
  });
});

router.get('/list', function(req, res, next) {
  // return all registered users
  res.send('respond with a resource');
});

module.exports = router;
