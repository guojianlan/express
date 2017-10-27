var redis = require("redis");
module.exports = (function (option) {
  var client = null;
  var option = options;
  return function (option) {
    if (client) {
      console.log('第二次进入')
      console.log(option)
      return client
    } else {
      console.log('第1次进入')
      console.log(option)
      client = '2';
      return client
    }
  }
})()