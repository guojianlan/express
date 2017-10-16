var express = require('express');
var router = express.Router();
var Base = require('../models/index.js').Base;
var utils = require('../utils')
var _ = require('lodash')
router.get('/', function (req, res, next) {
  var defaultBase = {
      data:{
        item:{
          header_img:'',
          name:'',
          sex:'',
          location_name:'',
          email:'',
          QQ:'',
          marital:'',
          political:'',
          wechat:'',
          weibo:'',
          zcool:'',
          zhihu:'',
          github:'',
        }
      }
    }
  if(!req.session.user){
    res.send(utils.res40121Code(
      _.assign(defaultBase)
    ))
  }else{
    Base.findOne({
        uid: req.session.user._id
      }).exec().then((doc) => {
        
        if (doc) {
          //有文档
          res.send(utils.resSuccessCode(_.assign({},defaultBase,doc)));
        } else {
          console.log(utils.resSuccessCode(_.assign({},defaultBase)));
          res.send(utils.resSuccessCode(_.assign({},defaultBase)));
        }
      }).catch((err) => {
        next(err)
      })
  }
  
})

router.post('/', function (req, res, next) {
  let {
    body
  } = req;
  if (!req.session.user) {
    res.send(utils.resErrorCode({
      msg: '你还没有登录'
    }))
  } else {
    Base.findOneAsync({
      uid: req.session.user._id
    }).then((doc) => {
      if (!doc) {
        //没有文档
        var MyBase = new Base(Object.assign({
          uid: req.session.user._id
        }, body));
        MyBase.saveAsync().then((doc) => {
          res.send(utils.resSuccessCode({
            data: doc
          }));
        }).catch((err) => {
          next(err);
        })
      } else {
        Base.findOneAndUpdateAsync({
          uid: req.session.user._id
        }, {
          $set: body
        }, {
          new: true
        }).then((doc) => {
          res.send(utils.resSuccessCode({
            data: doc
          }));
        }).catch((err) => {
          next(err);
        })
      }
    }).catch((err) => {
      next(err);
    })
  }
})
module.exports = router;