/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Base = require('../models/index.js').Base;
var Hashes = require('jshashes')
var utils = require('../utils')
var checklogin = require('../middleware/checkLogin.js');
router.post('/', async function (req, res, next) {
    var body = req.body;
    var find_user_doc = await User.findOne({
        mobile: body.mobile
    });
    if (!find_user_doc) {
        var SHA1 = new Hashes.SHA1;
        var password = SHA1.hex(req.body.password)
        var myUser = new User({
            mobile: req.body.mobile,
            password: password
        });
        var user_doc = await myUser.save();
        var user = user_doc.toObject();
        delete user.password
        req.session.user = user;
        res.send(utils.resSuccessCode({
            data: user
        }))
    } else {
        res.send(utils.resSuccessCode({
            msg: '该手机已注册'
        }));
    }
})
module.exports = router;