const express = require('express');
const router = express.Router();
const { checkToken } = require('../../../helper/checkToken')
const { signUp, signIn, logout, getProfile } = require('../../controller/student.controller')

/**
 * /authentication
 * @url http://localhost:5001/student
 *
 */



router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/logout', logout);

router.get('/profile', checkToken, getProfile);


module.exports = router;