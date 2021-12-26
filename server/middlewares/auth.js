import jwt from 'jsonwebtoken';

// check if user is authenticated
function isAuthenticated(req, res, next) {
    try {
        if (res.headers.authorization) {
            const token = res.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }
                req.user = decoded;
                next();
            });
        }
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
}

//  check if user is verified
function isVerified(req, res, next) {
    if (req.user.isVerified) {
        next();
    }  else {
        res.status(401).json({
            message: 'User not verified'
        });
    }
}

//  check if user is pro member
function isPro(req, res, next) {
    if (req.user.isPro) {
        next();
    }  else {
        res.status(401).json({
            message: 'User not pro'
        });
    }
}

module.exports = { isAuthenticated, isVerified, isPro };