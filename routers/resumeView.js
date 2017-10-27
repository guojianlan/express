'use strict';

import express from 'express';
import resumeView from '../controller/resumeView/index'
import checkLogin from '../middleware/checkLogin'
const router = express.Router();

router.get('/', checkLogin,resumeView.template)
router.get('/downTemplate',checkLogin,resumeView.downTemplate)
export default router