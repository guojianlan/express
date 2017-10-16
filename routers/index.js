/**
 * Created by guojian on 16/11/28.
 */
// let express = require('express');
let mergeBody  = require('../middleware/mergeBody.js');
// let register = require('./register.js');
// let login = require('./login.js');
// let utils = require('../utils/index.js');
// let fileUpload = require('./fileUpload.js');
// let checklogin = require('./checklogin.js');
// let base = require('./base.js')
// let resume = require('./resumes.js');
import site from './site.js'
import resume from './resume.js'
module.exports = function(app){
    // app.use('/site/register',mergeBody,register)
    // app.use('/hehe/site/register',mergeBody,register)
    // app.use('/site/login',mergeBody,login)
    // app.use('/site/fileUpload',fileUpload)
		// app.use('/site/checklogin',checklogin)
    // app.get('/site/logout',(req,res)=>{
		// 	req.session.user = null;
  	// 	req.session.error = null;
		// 	res.send(utils.resSuccessCode({data:{msg:"退出成功"}}))
    // })
		// app.use('/site/base',mergeBody,base)
    // app.use('/site/resume',mergeBody,resume)
    app.use('/api/v1',mergeBody,site)
    app.use('/api/resume',mergeBody,resume)
}
