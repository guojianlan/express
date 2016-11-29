/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    console.log(req.body);
    res.send(req.query);
})
router.post('/',function(req,res){
    res.send(req.body);
})
module.exports=router;