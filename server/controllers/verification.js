const { getUser, getUserById } = require('../services/user');
const { getToken, getTokenByUserId } = require('../services/token');
const { sendVerificationMail } = require('./email');

// @route POST api/verification/resend
// @desc Resend verification email
// @access Public
exports.resend = async (req, res) => {
    const { email } = req.user;
    try {
        if (!email) {
            throw {
                msg: 'email is required',
                status: 400
            }
        }
        // find user
        const user = await getUser(email);
        if (!user) {
            throw {
                msg: 'User does not exist',
                status: 400
            }
        }
        if (user.isVerified) {
            throw {
                msg: 'User is already verified',
                status: 400
            }
        }
        // check if a verification token exists
        const token = await getTokenByUserId(user._id);
        if (token) {
            throw {
                msg: 'Verification token already exists, please check your inbox!',
                status: 400
            }
        }
        // generate verification token
        const verToken = await user.genVerificationToken();
        // send verification email
        sendVerificationMail(user.email, verToken.token);
        // send response
        res.status(200).json({message: `Verification token has been sent to ${user.email}, please verify your email before login!`});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route GET api/verification/:token
// @desc Verify user via token
// @access Public
exports.verify = async (req, res) => {
    const { t } = req.params;
    try {
        // find token
        const token = await getToken(t);
        if (!token) {
            throw {
                msg: 'Token not found, it may\'ve been expired. Please try resending the verification email',
                status: 400
            }
        }
        // find user
        const user = await getUserById(token.userId);
        if (!user) {
            throw {
                msg: 'User does not exist',
                status: 400
            }
        }
        // check if user is verified
        if (user.isVerified) {
            throw {
                msg: 'User is already verified',
                status: 400
            }
        }
        // verify user
        user.isVerified = true;
        await user.save();
        // send response
        res.status(200).json({message: 'User has been verified, please login!'});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}
