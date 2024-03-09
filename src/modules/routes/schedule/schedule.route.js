const express = require('express');
const router = express.Router();
const { checkToken } = require('../../../helper/checkToken')
const { createSchedule, updateASchedule, deleteSchedule, getSchedules } = require('../../controller/schedule.controller')

/**
 * /authentication
 * @url http://localhost:5001/schedule
 *
 */

router.post('/create', checkToken, createSchedule);
router.post('/update', checkToken, updateASchedule);
router.post('/delete', checkToken, deleteSchedule);

router.get('/', checkToken, getSchedules);


module.exports = router;