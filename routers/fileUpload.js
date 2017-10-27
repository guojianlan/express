var express = require('express');
var formidable = require('formidable')
var router = express.Router();
var util = require('util');
router.post('/image',function(req,res){
	 //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "uploads/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
  
    form.parse(req, function(err, fields, files) {
      res.send({
      	filePath:files.uploadFile.path
      });
    });
})
module.exports=router;