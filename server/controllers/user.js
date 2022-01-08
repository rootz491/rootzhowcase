const { getUserById, deleteUserById, getUserWithPwd } = require('../services/user');
const { sendGoodByeMail } = require('./email');

// @route   GET api/user
// @desc    Get current user's info
// @access  Protected
exports.getUserByToken = async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        if (!user) {
            throw {
                status: 404,
                msg: 'User not found'
            };
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.msg });
    }
}

// @route   GET api/user/:id
// @desc    Get user by id
// @access  Protected
exports.getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            throw {
                status: 404,
                msg: 'User not found'
            };
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.msg });
    }
}

// @route   PUT api/user/
// @desc    Update user by id
// @access  Protected
exports.updateUser = async (req, res) => {
    try {
        console.log(req.body.about);
        const user = await getUserById(req.user._id);
        if (!user) {
            throw {
                status: 404,
                msg: 'User not found'
            };
        }
        // update user
        user.about = req.body.about;
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.msg });
    }
}

// @route   DELETE api/user/
// @desc    Delete user by id
// @access  Protected
exports.deleteUser = async (req, res) => {
    try {
        const password = req.body.password;
        if (!password)
            throw {
                status: 400,
                msg: 'password is required!'
            }
        const user = await getUserWithPwd(req.user.email);
        const correctPassword = await user.comparePassword(password);
        if (!correctPassword)
            throw {
                status: 400,
                msg: 'incorrect password'
            }
        const deleted = await deleteUserById(req.user._id);
        if (!deleted) {
            throw {
                status: 400,
                msg: 'something went wrong, please try again later!'
            };
        }
        await sendGoodByeMail(req.user.email);
        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.msg });
    }
}