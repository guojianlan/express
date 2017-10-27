'use strict';

import express from 'express';
import User from '../controller/site/user'
import checkLogin from '../middleware/checkLogin'
const router = express.Router();

router.get('/checkLogin', User.checkLogin)
router.post('/login', User.login)
router.post('/register', User.register)
router.get('/logout',User.logout)
router.get('/gt/register',User.gtRegister);
router.post('/saveHeaderImage',User.saveHeaderImage)
router.post('/forgetPass',User.forgetPass)
router.post('/reBindPass',User.reBindPass)
router.post('/SendMobileCode',User.SendMobileCode)
router.get('/createPdf',User.createPdf)
export default router