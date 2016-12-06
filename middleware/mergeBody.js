var _ = require('lodash')
module.exports = function(req,res,next){
	req.body = _.merge(req.query,req.body);
	next();
}