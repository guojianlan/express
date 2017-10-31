/**
 * Created by guojian on 16/11/28.
 */
require("babel-core/register");
var express = require('express')
var ejs = require('ejs');
var app = express();
var router = require('./routers/');
var config = require('config');
var dbConfig = config.get('mongodb');
var mongoose = require('mongoose');
console.log(process.env.NODE_ENV);
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fs =require('fs');
var path = require('path')

var os = require('os');
//链接数据库
mongoose.connect(dbConfig);
//设置请求体
var bodyParser = require('body-parser')
// app.use(bodyParser());
app.use(bodyParser.json({
  limit: '50mb'
})); // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({
  limit: '50mb'
}))
//设置静态资源
app.use('/static', express.static('public'))
app.use('/pdfjs', express.static('public/pdfjs'))
//设置图片静态资源
app.use('/uploads', express.static('uploads'))
//设置session
app.use(session({
  name: config.get('session.key'), // 设置 cookie 中保存 session id 的字段名称
  secret: config.get('session.secret'), // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.get('session.maxAge') // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: dbConfig // mongodb 地址
  })
}));


//设置模板
app.set('view engine', 'html');
app.engine('.html', ejs.renderFile)
var getIPAdress = function () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1'
};

router(app);
app.use('/page/preview',(req,res)=>{
  return res.render(path.join(__dirname,'public','template/viewer.html'),{
    cvUrl:'https://pic.yy5b.com/pdf/out4.pdf'
  });
})
app.use('*', (req, res) => {
  return res.render(path.join(__dirname,'public','cv/index.html'));
})

var server = app.listen(config.get('port'), () => {
  var host = getIPAdress();
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})