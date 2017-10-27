var utils = require('../utils/index.js')
var redis = require("redis");
export default (req, res, next) => {
 
  if (!req.session.user) {
    return res.send(utils.resErrorCode({
      'code': 40121,
      'msg': "请登录之后再来操作"
    }));
    //return res.redirect('/signin');
  } else {
    next();
  }
  // redisClint.hgetAsync(['my_user_key', req.body.sess_id||'']).then(resp=>{
  //   if(resp){
  //     next();
  //   }else{
  //     return res.send(utils.resErrorCode({
  //       'code': 40121,
  //       'msg': "请登录之后再来操作"
  //     }));
  //   }
  // })
 
}