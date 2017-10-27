/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Hashes = require('jshashes')
var utils = require('../utils')
var checklogin = require('../middleware/checkLogin.js')
router.get('/', function (req, res) {
  res.send(utils.resSuccessCode({data:{is_login:req.session.user?1:0}}));
})
module.exports = router;