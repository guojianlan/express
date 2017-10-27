'use strict';

import express from 'express';
import resume from '../controller/resume/resume'
import checkLogin from '../middleware/checkLogin'
const router = express.Router();

router.get('/list', checkLogin,resume.getList)
router.post('/create',checkLogin,resume.createResume)
router.post('/allData',checkLogin,resume.getResume)
router.post('/saveResumeBase',checkLogin,resume.saveResumeBase)
router.post('/saveResumeEdu',checkLogin,resume.saveResumeEdu)
router.post('/deleteResumeEdu',checkLogin,resume.deleteResumeEdu)
router.post('/saveReumeName',checkLogin,resume.saveReumeName)
router.post('/saveResumeTarget',checkLogin,resume.saveResumeTarget)
router.post('/saveResumeWork',checkLogin,resume.saveResumeWork)
router.post('/deleteResumeWork',checkLogin,resume.deleteResumeWork)
router.post('/saveResumeEduE',checkLogin,resume.saveResumeEduExperience)
router.post('/deleteResumeEduE',checkLogin,resume.deleteResumeEduexperience)
router.post('/saveResumeProject',checkLogin,resume.saveResumeProject)
router.post('/deleteResumeProject',checkLogin,resume.deleteResumeProject)
router.post('/saveResumeCertificate',checkLogin,resume.saveResumeCertificate)
router.post('/deleteResumeCertificate',checkLogin,resume.deleteResumeCertificate)
router.post('/saveResumeBaseIntro',checkLogin,resume.saveResumeBaseIntro)
router.post('/saveResumeHobby',checkLogin,resume.saveResumeHobby)
router.post('/saveResumeSkill',checkLogin,resume.saveResumeSkill)
router.post('/changeResumeDefault',checkLogin,resume.changeDefaultResule)
export default router