var utils = require('../utils/index.js')
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

}