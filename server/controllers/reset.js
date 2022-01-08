const { getUser, getUserByToken } = require('../services/user');
const { sendPasswordResetMail } = require('./email');

// @route GET api/reset
// @desc request reset password for authenticated user
exports.requestResetByToken = async (req, res) => {
    const { email } = req.user;
    try {
        // verify email field
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
        if (user.passwordResetExpires > Date.now()) {
            throw {
                msg: 'You have already requested a password reset, please check your email',
                status: 400
            }
        }
        // generate reset token
        await user.genPwdResetToken();
        console.log(user.passwordResetToken);
        // send password reset email
        sendPasswordResetMail(user.email, user.passwordResetToken);
        // send response
        res.status(200).json({message: `password reset link has been sent to ${user.email}, please check your email asap!`});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route POST api/reset
// @desc request reset password
// @access Public
exports.requestReset = async (req, res) => {
    const { email } = req.body;
    try {
        console.log(email);
        // verify email field
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
        if (user.passwordResetExpires > Date.now()) {
            throw {
                msg: 'You have already requested a password reset, please check your email',
                status: 400
            }
        }
        // generate reset token
        await user.genPwdResetToken();
        // send password reset email
        sendPasswordResetMail(user.email, user.passwordResetToken);
        // send response
        res.status(200).json({message: `password reset link has been sent to ${user.email}, please check your email asap!`});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route POST api/reset/:token
// @desc reset password
// @access Public
exports.doReset = async (req, res) => {
    const { t } = req.params;
    const { pass1, pass2 } = req.body;
    try {
        // verify user inputs
        if (!pass1 || !pass2 || !t) {
            throw {
                msg: 'both password fields is required',
                status: 400
            }
        }
        if (pass1 !== pass2) {
            throw {
                msg: 'passwords do not match',
                status: 400
            }
        }
        // find user by token
        const user = await getUserByToken(t);
        // check if token doesn't belong to user
        if (!user) {
            throw {
                msg: 'this token is invalid, please request a new one',
                status: 400
            }
        }
        // check if token has expired
        if (user.passwordResetExpires < Date.now()) {
            throw {
                msg: 'this token has expired, please request a new one',
                status: 400
            }
        }
        // update password
        user.password = pass1;
        // dispose token
        user.passwordResetToken = '';
        user.passwordResetExpires = '';
        await user.save();
        // send response
        res.status(200).json({msg: 'password has been reset'});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}