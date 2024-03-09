const express = require('express');
const router = express.Router();

/**
 * @url http://localhost:5001/
 */

router.get('/', async (req, res) => {
    res.send('Welcome to routine generator Backend');
});

router.use('/student', require('./student/student.route'));
router.use('/schedule', require('./schedule/schedule.route'));

module.exports = router;