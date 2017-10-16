var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
//工作经历
var _MyWork = Schema({
    resumeId:{type: Schema.ObjectId, ref: 'Resume'},
    type_id:{type:String,default:""}, //类型
    company_name:{type:String,default:""},//公司名称
    position_name:{type:String,default:""},//职位名称
    start_time:{type:String,default:""},//开始时间
    end_time:{type:String,default:""},//结束时间
    description:{type:String,default:""}//工作描述
});
_MyWork.plugin(timestamps);
var Work = mongoose.model('Work',_MyWork);
/* global db */
module.exports = Work;