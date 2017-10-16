var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
//教育背景
var _MyEdu = Schema({
    resumeId:{type: Schema.ObjectId, ref: 'Resume'},
    school_name:{type:String,default:""}, // 学校名称
    college_name:{type:String,default:""},//学院名称
    major_name:{type:String,default:""},//专业名称
    degree:{type:String,default:""},//学历
    start_time:{type:String}, //开始时间
    end_time:{type:String}, //结束时间
    description:{type:String,default:""}//描述
});
_MyEdu.plugin(timestamps);
var Edu = mongoose.model('Edu',_MyEdu);
/* global db */
module.exports = Edu;