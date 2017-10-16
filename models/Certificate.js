var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
//资格证书
var _MyCertificate = Schema({
    resumeId:{type: Schema.ObjectId, ref: 'Resume'},
    name:{type:String,default:""},//名称
    start_time:{type:String,default:""},
    end_time:{type:String,default:""},
    description:{type:String,default:""},//描述
});
_MyCertificate.plugin(timestamps);
var Certificate = mongoose.model('Certificate',_MyCertificate);
/* global db */
module.exports = Certificate;