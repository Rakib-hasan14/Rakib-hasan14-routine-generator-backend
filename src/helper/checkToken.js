const { verify } = require('jsonwebtoken');
const { UserModel } = require('../modules/models')


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
       
        const { userId } = verify(token, process.env.JWTSECRET);
        console.log(userId)
        if (!userId) {
            return res.status(403).json({
                status: false,
                message: 'Invalid22 token',
            });
        }

        const user = await UserModel.findOne({
            _id: userId,
        });

        if (!user) {
            return res.status(403).json({
                status: false,
                error: 'Invalid1 token',
            });
        }

        req.userId = userId;
        req.requestId = userId;

        next();
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: 'Invalid token',
        });
    }
};