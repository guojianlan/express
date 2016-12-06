/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var mergeBody  = require('../middleware/mergeBody.js');
var signup = require('./signup.js');
var fileUpload = require('./fileUpload.js');
module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index')
    })
    app.use('/signup',mergeBody,signup)
    app.use('/fileUpload',fileUpload)
}