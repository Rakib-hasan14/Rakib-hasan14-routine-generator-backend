const { successResponse, errorResponse } = require('../../helper/apiResponse')
const ScheduleSchema = require('../model/schedule.model')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

exports.createSchedule = async (req, res) => {
    try {
        const student_id = req.studentId
        const {
            title,
            priority,
            start_time,
            end_time,
            dayName
        } = req.body




        const isExists = await ScheduleSchema.findOne({ dayName, start_time, student_id })

        if (isExists) return errorResponse(res, 'Already exists in this time')

        const dayNumber = {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6
        }

        const schedule = await ScheduleSchema.create({
            title,
            priority,
            start_time,
            end_time,
            dayName,
            student_id,
            dayNumber: dayNumber[dayName]
        })

        successResponse(res, {
            message: 'Successfully created schedule',
            data: schedule
        })

    } catch (error) {
        errorResponse(res, error.message)
    }
}

exports.updateASchedule = async (req, res) => {
    try {
        const {
            id,
            title,
            priority,
            start_time,
            end_time,
            dayName
        } = req.body


        const isExists = await ScheduleSchema.findOne({ _id: id })

        if (!isExists) return errorResponse(res, 'Schedule not found')

        await ScheduleSchema.updateOne(
            { _id: id },
            {
                title,
                priority,
                start_time,
                end_time,
                dayName
            }
        )

        successResponse(res, {
            message: 'Successfully updated schedule'
        })

    } catch (error) {
        errorResponse(res, error.message)
    }
}

exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.body

        const product = await ScheduleSchema.findByIdAndDelete({ _id: id })

        if (product === null) {
            throw new Error('Not Delete')
        }

        successResponse(res, {
            message: 'Schedule Deleted',
            result: true
        })
    } catch (error) {
        errorResponse(res, error.message)
    }
}

exports.getSchedules = async (req, res) => {
    try {
        const student_id = req.studentId

        const schedules = await ScheduleSchema.aggregate([
            {
                $match: {
                    student_id: new ObjectId(student_id)
                }
            },
            {
                $group: {
                    _id: '$dayName',
                    data: { $push: '$$ROOT' }
                }
            }
        ])

        successResponse(res, {
            message: 'Get schedules',
            data: schedules
        })
    } catch (error) {
        errorResponse(res, error.message)
    }
}