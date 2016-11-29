/**
 * Created by guojian on 16/11/28.
 */
var express = require('express');
var signup = require('./signup.js')
module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index')
    })
    app.use('/signup',signup)
}