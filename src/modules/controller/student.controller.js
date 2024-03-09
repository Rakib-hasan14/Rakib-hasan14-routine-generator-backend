const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../../helper/apiResponse')
const StudentSchema = require('../model/student.model')

exports.signUp = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        const isExists = await StudentSchema.findOne({ email })

        if (isExists) return errorResponse(res, 'Email already exist')

        const bcyrptPass = await bcrypt.hash(password, 10)

        const student = await StudentSchema.create({
            name,
            email: email.toLowerCase(),
            password: bcyrptPass
        })

        // Create token
        const token = jwt.sign(
            { student_id: student._id },
            process.env.JWTSECRET,
            {
                expiresIn: "2h",
            }
        );

        delete student.password

        successResponse(res, {
            message: 'Successfully sign up',
            data: {
                student,
                token
            }
        })

    } catch (error) {
        errorResponse(res, error.message)
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            validationError(res, 'Email or password is required');
        }

        const student = await StudentSchema.findOne({
            email: email,
            deletedAt: null,
        }).select('-createdAt -updatedAt');

        if (!student) {
            return errorResponse(
                res,
                'User not found . please sign up first'
            );
        }

        const matchPassword = bcrypt.compareSync(password, student.password);

        if (!matchPassword) {
            return errorResponse(res, 'Wrong password.');
        }

        const jwtData = {
            studentId: student._id
        };


        const token = jwt.sign(
            jwtData,
            process.env.JWTSECRET,
            {}
        );

        delete student._doc.password;
        delete student._doc._id;

        successResponse(res, {
            message: 'Login Success.',
            data: {
                user: {
                    token,
                    ...student._doc,
                },
            },
        });
    } catch (error) {
        errorResponse(res, error.message)
    }
}

exports.getProfile = async (req, res) => {
    try {
        const id = req.studentId

        const profile = await StudentSchema.findById(id).select('-password _id')

        if (!profile) return errorResponse(res, 'User not found')

        successResponse(res, {
            message: 'Get Profile',
            data: profile
        })
    } catch (error) {
        errorResponse(res, error.message)
    }
}