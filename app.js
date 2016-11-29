/**
 * Created by guojian on 16/11/28.
 */
var express = require('express')
var ejs =require('ejs');
var app = express();
var router = require('./routers/');
//设置请求体
var bodyParser = require('body-parser')
app.use(bodyParser());
app.use(bodyParser.json({limit: '1mb'})); // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ extended: false }))
//设置静态资源
app.use('/static',express.static('public'))
//设置模板
app.set('view engine','html');
app.engine('.html',ejs.renderFile)


router(app)

var server = app.listen('3000', () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})
