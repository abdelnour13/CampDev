const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');


module.exports = async (req,res,next) => {
    try {

        const header = req.getHeader('Authorization');

        if(!header) {
            const error = new Error('utilisateur non authentifié');
            error.status = httpStatus.UNAUTHORIZED;
            return next(error);
        }

        const token = header.split(' ')[1];

        const { email } = jwt.verify(token,process.env.JWT_SECRET);

        req.email = email;

        next();

    } catch(err) {
        next(err);
    }
}