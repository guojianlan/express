var utils = require('../../utils/index.js')
var Hashes = require('jshashes');
var fs = require('fs');
import ResumeModel from '../../models/Resume.js'
import UserModel from '../../models/User'
var qiniu = require('qiniu');
var Geetest = require('gt3-sdk');
var bucket = 'resume-project'; //上传名字
var accessKey = 'bu8QA-YZMrPmJisQdZuKq3inoi2T94U5WWIv9jkl';
var secretKey = '7jeil1iGqsrHCYhIs45o0LrurKBtEfI6qvXE-VF-';
var qnDomain = 'http://pic.yy5b.com/'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
var captcha = new Geetest({
  geetest_id: '92e28d27290f0019359ffe9730a8198e',
  geetest_key: '934b04a031323d0c65de11f3fc227480'
});
class user {
  constructor() {
    this.checkLogin = this.checkLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.gtRegister = this.gtRegister.bind(this);
    this.captchavalidata = this.captchavalidata.bind(this);
    this.saveHeaderImage = this.saveHeaderImage.bind(this);
  }
  async checkLogin(req, res, next) {
    //检测是否已经登录
    if (!req.session.user) {
      return res.send(utils.resErrorCode({
        code: 40121
      }));
    }
    res.send(utils.resSuccessCode({
      data: {
        is_login: req.session.user ? 1 : 0
      }
    }));
  }
  async login(req, res, next) {
    //登录
    var SHA1 = new Hashes.SHA1;
    var body = req.body;
    var userDoc = await UserModel.findOne({
      mobile: body.mobile
    })
    //查找手机号码
    if (userDoc) {
      var user = userDoc.toObject();
      var password = SHA1.hex(body.password)
      //匹配密码
      if (password == user.password) {
        delete user.password
        req.session.user = user;
        res.send(utils.resSuccessCode({
          data: user
        }))
      } else {
        res.send(utils.resSuccessCode({
          data: {},
          status: 0,
          code: "password",
          msg: "密码错误"
        }));
      }
    } else {
      res.send(utils.resSuccessCode({
        data: {},
        status: 0,
        code: "mobile",
        msg: "手机号码不存在或错误"
      }));
    }
  }
  async logout(req, res, next) {
    req.session.user = null;
    req.session.error = null;
    res.send(utils.resSuccessCode({
      data: {
        msg: "退出成功"
      }
    }))
  }
  captchavalidata(req, res, next) {
    return new Promise((resolve, reject) => {
      if (!req.body.geetest_challenge) {
        resolve(utils.resErrorCode({
          code: "40013",
          msg: "请填写验证"
        }))
      }
      captcha.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
      }, (err, success) => {
        if (err) {
          resolve(utils.resErrorCode({
            msg: "请填写验证"
          }))
        } else if (!success) {
          resolve(utils.resErrorCode({
            code: "40014",
            msg: "验证码未验证成功"
          }))
        } else {
          resolve(utils.resSuccessCode({
            data: {
              statue: 1
            }
          }))
        }
      })
    })
  }
  async register(req, res, next) {
    var body = req.body;
    if (!body.mobile) {
      return res.send(utils.resErrorCode({
        msg: "请填写正确的手机号码",
        code: "mobile"
      }))
    }
    if (!body.password) {
      return res.send(utils.resErrorCode({
        msg: "请填写密码",
        code: "password"
      }))
    }
    var validata = await this.captchavalidata(req, res, next);
    if (validata.status == 0) {
      return res.send(validata);
    }
    var find_user_doc = await UserModel.findOne({
      mobile: body.mobile
    });
    if (!find_user_doc) {
      var SHA1 = new Hashes.SHA1;
      var password = SHA1.hex(req.body.password)
      var myUser = new UserModel({
        mobile: req.body.mobile,
        password: password
      });
      var MyResume = new ResumeModel({
        uid: myUser.id,
        name: 'reusme1'
      })
      myUser.resumeId = MyResume.id;
      myUser.resumes.push(MyResume.id);
      var user_doc = await myUser.save();
      var resume_doc = await MyResume.save();
      var user = user_doc.toObject();
      delete user.password
      req.session.user = user;
      req.session.user.resumeId = MyResume.id;
      res.send(utils.resSuccessCode({
        data: user
      }))
    } else {
      res.send(utils.resErrorCode({
        msg: '该手机已注册'
      }));
    }
  }
  async gtRegister(req, res, next) {
    captcha.register(null, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500);
        res.send(err);
        return;
      }

      if (!data.success) {
        // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
        // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

        // 为以防万一，你可以选择以下两种方式之一：

        // 1. 继续使用极验提供的failback备用方案
        req.session.fallback = true;
        res.send(utils.resErrorCode({
          data: data,
          code: 0,
        }))
        // 2. 使用自己提供的备用方案
        // todo

      } else {
        // 正常模式
        req.session.fallback = false;
        res.send(utils.resSuccessCode({
          data: data
        }))
      }
    });
  }
  decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
  }
  async saveHeaderImage(req, res, next) {
    var body = req.body;
    var imageBuffer = this.decodeBase64Image(body.data);
    var type = imageBuffer.type.split('/')[1];
    var fileName = Date.now() + '.' + type;
    var filePath = 'uploads/' + fileName
    fs.writeFile(filePath, imageBuffer.data, function (err) { //用fs写入文件
      if (err) {
        console.log(err);
      } else {
        var localFile = filePath;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        var key = fileName;
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
          respBody, respInfo) {
          if (respErr) {
            res.send(utils.resErrorCode({
              msg: '上传失败',
              error: respErr
            }))
          }
         
          if (respInfo.statusCode == 200) {
            var imageSrc =  respBody.key;
            res.send(utils.resSuccessCode({
              data:{
                imageUrl: imageSrc
              }
            }))
          } else {
            res.send(utils.resErrorCode({
              msg: '上传失败',
              data:respInfo
            }))
          }
          // 上传之后删除本地文件
          fs.unlinkSync(filePath);
        });
      }
    })

  }
}
export default new user();