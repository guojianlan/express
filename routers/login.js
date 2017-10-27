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
  // res.send(utils.resSuccessCode({data:{is_login:req.session.user?1:0}}));
  // User.findOne({
  //   mobile: '15920112861'
  // }).exec(function (err, doc) {
  //   if (err) return handleError(err);
  //   console.log(doc);
  //   res.send(doc);
  // });

})
router.post('/', async function (req, res, next) {
  var SHA1 = new Hashes.SHA1;
  var body = req.body;
  var userDoc = await  User.findOne({ mobile: body.mobile})
  User.findOne({
    mobile: body.mobile
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    if (!doc) {
      res.send(utils.resErrorCode({
        msg: '手机号码不存在'
      }));
    } else {
      var user = doc.toObject();
      var password = SHA1.hex(body.password)
      if (password == user.password) {
        delete user.password
        req.session.user = user;
        res.send(utils.resSuccessCode({
          data: user
        }))
      } else {
        res.send({
          data: Object.assign({
            islogin: req.isLogin,
            status: 0,
            code: 0,
            msg: '请填写正确的密码'
          })
        });
      }

    }
  })

  // var myUser = new User({name:req.body.hehe});
  // User.find({ name: '我擦' }, function(err,doc){
  // 	console.log(doc);
  // });
  //    myUser.save(function(err, doc) {
  //    if (err) next(err);
  //    res.send(req.body);
  return;
  //})
})
module.exports = router;