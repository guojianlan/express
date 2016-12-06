/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
router.get('/',function(req,res){
   
    res.send(req.query);
})
router.post('/',function(req,res,next){
		var myUser = new User({name:req.body.hehe});
		User.find({ name: '我擦' }, function(err,doc){
			console.log(doc);
		});
    myUser.save(function(err, doc) {
    if (err) next(err);
    res.send(req.body);
    return;
  })
})
module.exports=router;