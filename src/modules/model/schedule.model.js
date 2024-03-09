const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        priority: {
            type: Number,
            default: 1
        },
        start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        },
        dayName: {
            type: String,
            required: true
        },
        student_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        dayNumber: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('schedules', ScheduleSchema)