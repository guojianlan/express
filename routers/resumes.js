/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Resume = require('../models/index.js').Resume;
var Cv = require('../models/index.js').Cv;
var Hashes = require('jshashes')
var utils = require('../utils')
var _ = require('lodash')
var checklogin = require('../middleware/checkLogin.js');
router.get('/', async function (req, res, next) {
  var body = req.body;

  if (!req.session.user) {
    res.send(utils.resErrorCode({
      msg: '你还没有登录'
    }))
  } else {
    //寻找resumes
    var userDoc = await User.findById(req.session.user._id).populate('resumes', 'name');
    console.log(userDoc);
    res.send(utils.resSuccessCode({
      data: userDoc
    }));

  }
});
router.get('/cv', async function (req, res, next) {
  var body = req.body;
  if (!req.session.user) {
    res.send(utils.resErrorCode({
      msg: '你还没有登录'
    }))
  } else {
    var cv_doc = await Resume.findById(body.id);
    res.send(utils.resSuccessCode({
      data: _.assign({item:{name:cv_doc.name,cv:cv_doc.sections}})
    }));
  }
})
router.post('/create', async function (req, res, next) {
  var body = req.body;
  if (!req.session.user) {
    res.send(utils.resErrorCode({
      msg: '你还没有登录'
    }))
  } else {
    //如果已经登录则创建一个resume
    //首先查找有多少个resume
    var data = await User.findById(req.session.user._id);
    var resumeNum = 0;
    var resumeNum = data.resumes.length + 1;
    var basecv = {
      "sections": [
        {key:'base',name:"gggg"},
        {key:'edu',name:"edu",list:[{
          name:"xxx",
          name:"xxxxx"
        }]}
      ]
    }
    var MyResume = new Resume(_.assign({}, {
      uid: req.session.user._id,
      name: 'reusme' + resumeNum
      //关联用户
    }, basecv))
    var resume_doc = await MyResume.save();
    if (resume_doc) {
      var user_doc = await User.findByIdAndUpdate(req.session.user._id, {
        $push: {
          resumes: resume_doc._id
        }
      })
      if (user_doc) {
        res.send(utils.resSuccessCode({
          data: user_doc
        }));
      }
    }
  }

})
module.exports = router;