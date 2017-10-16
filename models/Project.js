var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
//项目信息
var _MyProject = Schema({
    resumeId:{type: Schema.ObjectId, ref: 'Resume'},
    name:{type:String,default:""}, //项目名称
    start_time:{type:String,default:""},
    end_time:{type:String,default:""},
    description:{type:String,default:""},
});
_MyProject.plugin(timestamps);
var Project = mongoose.model('Project',_MyProject);
/* global db */
module.exports = Project;