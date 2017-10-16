var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var timestamps = require('mongoose-timestamp');
var _MyUser = Schema({
    mobile: String,
    email:String,
    password:String,
    resumes:[
       {type: ObjectId, ref: 'Resume'}
    ],
    resumeId:{ type: String, default: "" },
});
_MyUser.plugin(timestamps);
var User = mongoose.model('User',_MyUser);
module.exports = User;