var utils = require('../../utils/index.js')
import ResumeModel from '../../models/Resume.js'
import UserModel from '../../models/User'
import EduModel from '../../models/Edu'
import WorkModel from '../../models/Work'
import EduExperienceModel from '../../models/EduExperience'
import ProjectModel from '../../models/Project'
import CertificateModel from '../../models/Certificate'
var _ = require('lodash')
class Resume {
  constructor() {
    this.targetArr = ['target_position', 'target_salary', 'target_industry', 'target_location', 'target_type'];
    this.baseArr = ['user_name', 'birth_time', 'nationality', 'sex', 'name', 'header_img', 'location_name', 'email', 'QQ', 'marital', 'political', 'wechat', 'weibo', 'zcool', 'zhihu', 'github'];
    this.baseIntroArr = ['baseIntro'];
    this.hobbyArr = ['hobby'];
    this.skillArr = ['skill'];
    this.workArr = ['company_name', "type_id", "description", 'position_name', 'start_time', 'end_time'];
    this.eduexperienceArr = ['id', 'title', 'start_time', 'end_time', 'position', 'type_id', 'description'];
    this.eduArr = ['id', 'school_name', 'college_name', 'major_name', 'degree', 'start_time', 'end_time', 'description'];
    this.projectArr = ['id', 'name', 'description', 'start_time', 'end_time'];
    this.certificateArr = ['id', 'name', 'description', 'start_time', 'end_time']
    this.getList = this.getList.bind(this)
    this.createResume = this.createResume.bind(this);
    this.getResume = this.getResume.bind(this);
    this.saveResumeBase = this.saveResumeBase.bind(this);
    this.saveResumeEdu = this.saveResumeEdu.bind(this);
    this.saveResumeTarget = this.saveResumeTarget.bind(this);
    this.saveResumeWork = this.saveResumeWork.bind(this);
    this.saveResumeEduExperience = this.saveResumeEduExperience.bind(this);
    this.saveResumeProject = this.saveResumeProject.bind(this);
    this.saveResumeCertificate = this.saveResumeCertificate.bind(this);
    this.saveResumeBaseIntro = this.saveResumeBaseIntro.bind(this);
    this.saveResumeHobby = this.saveResumeHobby.bind(this);
    this.saveResumeSkill = this.saveResumeSkill.bind(this);
    this.changeDefaultResule = this.changeDefaultResule.bind(this);
    this.saveReumeName = this.saveReumeName.bind(this);
    this.deleteResumeWork = this.deleteResumeWork.bind(this);
    this.deleteResumeEdu = this.deleteResumeEdu.bind(this);
    this.deleteResumeEduexperience = this.deleteResumeEduexperience.bind(this);
    this.deleteResumeProject = this.deleteResumeProject.bind(this);
    this.deleteResumeCertificate = this.deleteResumeCertificate.bind(this);
  }
  async getList(req, res, next) {
    var body = req.body;
    var userDoc = await UserModel.findById(req.session.user._id).populate('resumes', "name _id");
    res.send(utils.resSuccessCode({
      data: userDoc
    }));
  }
  async createResume(req, res, next) {
    var body = req.body;
    //如果已经登录则创建一个resume
    //首先查找有多少个resume
    var user_data = await UserModel.findById(req.session.user._id);
    var resumeNum = 0;
    var resumeNum = user_data.resumes.length + 1;
    //创建简历
    var MyResume = new ResumeModel({
      uid: req.session.user._id,
      name: 'reusme' + resumeNum,
    })
    //修改用户默认简历id
    if (user_data.resumes.length == 0 && user_data.resumeId == '') {
      user_data.resumeId = MyResume.id;
      req.session.user.resumeId = MyResume.id;
    }
    user_data.resumes.push(MyResume.id);
    var user_doc = await user_data.save();
    var resume_doc = await MyResume.save();
    res.send(utils.resSuccessCode({
      data: user_doc
    }));
  }
  async changeDefaultResule(req, res, next) {
    var body = req.body;
    req.session.user.resumeId = body.id;
    res.send(utils.resSuccessCode({
      data: body
    }))
  }
  async getResume(req, res, next) {
    var body = req.body;
    if (!req.session.user.resumeId) {
      return res.send(utils.resErrorCode({
        msg: "你还没有简历"
      }))
    }
    //传resumeId查找数据
    var resume_doc = await ResumeModel.findById(req.session.user.resumeId);
    var base = _.pick(resume_doc, this.baseArr);
    var target = _.pick(resume_doc, this.targetArr);
    var baseIntro = _.cloneDeep(_.result(resume_doc, 'baseIntro'))
    var skill = _.cloneDeep(_.result(resume_doc, 'skill'))
    var hobby = _.cloneDeep(_.result(resume_doc, 'hobby'))
    var eduExperience = await EduExperienceModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: 1
    })
    var edu = await EduModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    var work = await WorkModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    var project = await ProjectModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    var certificate = await CertificateModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    res.send(utils.resSuccessCode({
      data: {
        base,
        target,
        edu,
        baseIntro,
        skill,
        hobby,
        work,
        eduExperience,
        project,
        certificate
      }
    }));
  }
  async saveResumeBase(req, res, next) {
    var body = req.body;
    console.log('base')
    console.log(this.targetArr);
    var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId,
      _.pick(body, this.baseArr), {
        new: true
      }
    )
    res.send(utils.resSuccessCode({
      data: _.pick(resume, this.baseArr)
    }));
  }
  async saveResumeBaseIntro(req, res, next) {
    var body = req.body;
    var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId,
      _.pick(body, this.baseIntroArr), {
        new: true
      }
    )
    res.send(utils.resSuccessCode({
      data: _.pick(resume, this.baseIntroArr)
    }));
  }
  async saveReumeName(req, res, next) {
    var body = req.body;
    console.log(body);
    if (body.resumeName != '') {
      var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId, {
        name: body.resumeName
      }, {
        new: true
      })
      res.send(utils.resSuccessCode());
    }
  }
  async saveResumeHobby(req, res, next) {
    var body = req.body;
    if (!body.hobby) {
      body.hobby = [];
    }
    var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId,
      _.pick(body, this.hobbyArr), {
        new: true
      }
    )
    res.send(utils.resSuccessCode({
      data: _.pick(resume, this.hobbyArr)
    }));
  }
  async saveResumeSkill(req, res, next) {
    var body = req.body;
    if (!body.skill) {
      body.skill = [];
    }
    var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId,
      _.pick(body, this.skillArr), {
        new: true
      }
    )
    res.send(utils.resSuccessCode({
      data: _.pick(resume, this.skillArr)
    }));
  }
  async saveResumeTarget(req, res, next) {
    var body = req.body;
    if (!body.target_position) {
      body.target_position = [];
    }
    if (!body.target_location) {
      body.target_location = [];
    }
    if (!body.target_type) {
      body.target_type = [];
    }
    if (!body.target_industry) {
      body.target_industry = [];
    }
    var resume = await ResumeModel.findByIdAndUpdate(req.session.user.resumeId,
      _.pick(body, this.targetArr), {
        new: true
      }
    )
    res.send(utils.resSuccessCode({
      data: _.pick(resume, this.targetArr)
    }));
  }
  async saveResumeEdu(req, res, next) {
    var body = req.body;
    var eduA = body.edu;
    for (var i = 0; i < eduA.length; i++) {
      var item = eduA[i];
      if (item._id == 0 || _.isEmpty(item._id)) {
        var pushData = _.pick(item, this.eduArr)
        pushData.resumeId = req.session.user.resumeId;
        var work = new EduModel(pushData);
        await work.save();
      } else {
        var pushData = _.pick(item, this.eduArr);
        await EduModel.findByIdAndUpdate(item._id, pushData);
      }
    }
    var edu = await EduModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    res.send(utils.resSuccessCode({
      data: edu
    }));
  }
  async deleteResumeEdu(req,res,next){
    let {id} = req.body;
    if(id){
      await EduModel.findByIdAndRemove(id);
      res.send(utils.resSuccessCode({
        data:id
      }))
    }else{
      res.send(utils.resErrorCode({
        msg:'请传入要删除的id'
      }))
    }
    
  }
  async saveResumeWork(req, res, next) {
    var body = req.body;
    var workA = body.work;
    for (var i = 0; i < workA.length; i++) {
      var item = workA[i];
      if (item._id == 0 || _.isEmpty(item._id)) {
        var pushData = _.pick(item, this.workArr)
        pushData.resumeId = req.session.user.resumeId;
        var work = new WorkModel(pushData);
        await work.save();
      } else {
        var pushData = _.pick(item, this.workArr);
        await WorkModel.findByIdAndUpdate(item._id, pushData);
      }
    }
    var work = await WorkModel.find({
      resumeId: req.session.user.resumeId
    }).sort({
      start_time: -1
    })
    res.send(utils.resSuccessCode({
      data: work
    }));
  }
  async deleteResumeWork(req,res,next){
    let {id} = req.body;
    if(id){
      await WorkModel.findByIdAndRemove(id);
      res.send(utils.resSuccessCode({
        data:id
      }))
    }else{
      res.send(utils.resErrorCode({
        msg:'请传入要删除的id'
      }))
    }
    
  }
  async saveResumeEduExperience(req, res, next) {
    var body = req.body;
    var eduexperienceA = body.eduexperience;
    if (!eduexperienceA.length) {
      res.send(utils.resErrorCode({
        msg: "请传入eduexperience"
      }))
    } else {
      for (var i = 0; i < eduexperienceA.length; i++) {
        var item = eduexperienceA[i];
        if (item._id == 0 || _.isEmpty(item._id)) {
          var pushData = _.pick(item, this.eduexperienceArr)
          pushData.resumeId = req.session.user.resumeId;
          var eduexperience = new EduExperienceModel(pushData);
          await eduexperience.save();
        } else {
          var pushData = _.pick(item, this.eduexperienceArr);
          await EduExperienceModel.findByIdAndUpdate(item._id, pushData);
        }
      }
      var eduexperience = await EduExperienceModel.find({
        resumeId: req.session.user.resumeId
      }).sort({
        start_time: -1
      })
      res.send(utils.resSuccessCode({
        data: eduexperience
      }));
    }
  }
  async deleteResumeEduexperience(req, res, next){
    let {id} = req.body;
    if(id){
      await EduExperienceModel.findByIdAndRemove(id);
      res.send(utils.resSuccessCode({
        data:id
      }))
    }else{
      res.send(utils.resErrorCode({
        msg:'请传入要删除的id'
      }))
    }
  }
  async saveResumeProject(req, res, next) {
    var body = req.body;
    var projectA = body.project;
    if (!projectA.length) {
      res.send(utils.resErrorCode({
        msg: "请传入project"
      }))
    } else {
      for (var i = 0; i < projectA.length; i++) {
        var item = projectA[i];
        if (item._id == 0 || _.isEmpty(item._id)) {
          var pushData = _.pick(item, this.projectArr)
          pushData.resumeId = req.session.user.resumeId;
          var project = new ProjectModel(pushData);
          await project.save();
        } else {
          var pushData = _.pick(item, this.projectArr);
          await ProjectModel.findByIdAndUpdate(item._id, pushData);
        }
      }
      var project = await ProjectModel.find({
        resumeId: req.session.user.resumeId
      }).sort({
        start_time: -1
      })
      res.send(utils.resSuccessCode({
        data: project
      }));
    }
  }
  async deleteResumeProject(req, res, next){
    let {id} = req.body;
    if(id){
      await ProjectModel.findByIdAndRemove(id);
      res.send(utils.resSuccessCode({
        data:id
      }))
    }else{
      res.send(utils.resErrorCode({
        msg:'请传入要删除的id'
      }))
    }
  }
  async saveResumeCertificate(req, res, next) {
    var body = req.body;
    var certificateA = body.certificate;
    if (!certificateA.length) {
      res.send(utils.resErrorCode({
        msg: "请传入certificate"
      }))
    } else {
      for (var i = 0; i < certificateA.length; i++) {
        var item = certificateA[i];
        if (item._id == 0 || _.isEmpty(item._id)) {
          var pushData = _.pick(item, this.certificateArr)
          pushData.resumeId = req.session.user.resumeId;
          var certificate = new CertificateModel(pushData);
          await certificate.save();
        } else {
          var pushData = _.pick(item, this.certificateArr);
          await CertificateModel.findByIdAndUpdate(item._id, pushData);
        }
      }
      var certificate = await CertificateModel.find({
        resumeId: req.session.user.resumeId
      }).sort({
        start_time: -1
      })
      res.send(utils.resSuccessCode({
        data: certificate
      }));
    }
  }
  async deleteResumeCertificate(req, res, next){
    let {id} = req.body;
    if(id){
      await CertificateModel.findByIdAndRemove(id);
      res.send(utils.resSuccessCode({
        data:id
      }))
    }else{
      res.send(utils.resErrorCode({
        msg:'请传入要删除的id'
      }))
    }
  }
}
export default new Resume();