var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
//在校经历
var _MyEduExperience = Schema({
    resumeId:{type: Schema.ObjectId, ref: 'Resume'},
    type_id:{type:String,default:""},//type 
    title:{type:String,default:""},//名称
    start_time:{type:String},
    end_time:{type:String},
    description:{type:String,default:""},
    position:{type:String,default:""}
});
_MyEduExperience.plugin(timestamps);
var EduExperience = mongoose.model('EduExperience',_MyEduExperience);
/* global db */
module.exports = EduExperience;