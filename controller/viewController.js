var express = require('express');
var router = express.Router();

var axios = require('axios');
// const client = axios.create();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
