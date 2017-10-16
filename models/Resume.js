var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var timestamps = require('mongoose-timestamp');
//学校
var _MyResume = Schema({
    //与用户关联
    uid:{ type: ObjectId, ref: 'User'},
    name:{type:String},
    header_img:{type:String,default:"default.jpg"},
    user_name:{type:String,default:""},
    sex:{type:String,default:"1"}, //1男2女
    location_name:{type:String,default:""},
    email:{type:String,default:""},
    QQ:{type:String,default:""},
    marital:{type:String,default:""},
    political:{type:String,default:""},
    wechat:{type:String,default:""},
    weibo:{type:String,default:""},
    zcool:{type:String,default:""},
    zhihu:{type:String,default:""},
    github:{type:String,default:""},
    target_position:[],
    target_salary:{type:String,default:"0"},
    target_type:[],
    target_location:[],
    hobby:[],
    skill:[],
    baseIntro:{type:String,default:""},
});
_MyResume.plugin(timestamps);
var Resume = mongoose.model('Resume',_MyResume);
/* global db */
module.exports = Resume;