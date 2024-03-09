const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../../controller/student.controller')

/**
 * /authentication
 * @url http://localhost:5001/student
 *
 */



router.post('/sign-in', signIn);
router.post('/sign-up', signUp);


module.exports = router;