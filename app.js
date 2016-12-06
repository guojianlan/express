/**
 * Created by guojian on 16/11/28.
 */
var express = require('express')
var ejs =require('ejs');
var app = express();
var router = require('./routers/');
var config = require('config');
var dbConfig = config.get('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var webpackConfig = require('./webpackConfig/webpack-config-dev.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    // options
    
     publicPath:webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      }
}));
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(webpackHotMiddleware(compiler));
//链接数据库
mongoose.connect(dbConfig);
//设置请求体
var bodyParser = require('body-parser')
app.use(bodyParser());
app.use(bodyParser.json({limit: '1mb'})); // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ extended: false }))
//设置静态资源
app.use('/static',express.static('public'))
//设置图片静态资源
app.use('/uploads',express.static('uploads'))
//设置session
app.use(session({
  name: config.get('session.key'),// 设置 cookie 中保存 session id 的字段名称
  secret: config.get('session.secret'),// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.get('session.maxAge')// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: dbConfig// mongodb 地址
  })
}));
//设置模板
app.set('view engine','html');
app.engine('.html',ejs.renderFile)


router(app)

var server = app.listen(config.get('port'), () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})
