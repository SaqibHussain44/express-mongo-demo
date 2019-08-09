var express = require('express');
var router = express.Router();
var controller = require('./logs.controller');

router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email', function(req, res, next) {
  // return all registered users
  res.send('respond with a resource');
});

module.exports = router;
