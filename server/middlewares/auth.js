import jwt from 'jsonwebtoken';

// check if user is authenticated
function isAuthenticated(req, res, next) {
    try {
        if (res.headers.authorization) {
            const token = res.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    throw {
                        msg: 'Invalid token',
                        status: 401
                    }
                }
                req.user = decoded;
                next();
            });
        } else {
            throw {
                msg: 'No token provided',
                status: 401
            }
        }
    } catch (error) {
        res.status(error.status).json({
            message: error.msg
        });
    }
}

//  check if user is verified
function isVerified(req, res, next) {
    if (req.user.isVerified) {
        next();
    }  else {
        res.status(403).json({
            message: 'User not verified'
        });
    }
}

//  check if user is pro member
function isPro(req, res, next) {
    if (req.user.isPro) {
        next();
    }  else {
        res.status(403).json({
            message: 'User not pro'
        });
    }
}

//  check if user is admin
function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    }  else {
        res.status(403).json({
            message: 'User not admin'
        });
    }
}

module.exports = { isAuthenticated, isVerified, isPro, isAdmin };