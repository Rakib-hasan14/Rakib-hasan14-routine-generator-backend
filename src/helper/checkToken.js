const { verify } = require('jsonwebtoken');
const StudentSchema = require('../modules/model/student.model')


module.exports.checkToken = async (req, res, next) => {
    try {
        var token = req.get('authorization');

        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Access denied! unauthorized Admin',
            });
        }

        token = token.slice(7);
       
        const { studentId } = verify(token, process.env.JWTSECRET);
   
        if (!studentId) {
            return res.status(403).json({
                status: false,
                message: 'Invalid token',
            });
        }

        const student = await StudentSchema.findOne({
            _id: studentId,
        });

        if (!student) {
            return res.status(403).json({
                status: false,
                error: 'Invalid1 token',
            });
        }

        req.studentId = studentId;
        req.requestId = studentId;

        next();
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: 'Invalid token',
        });
    }
};