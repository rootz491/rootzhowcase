const { getUserById, } = require('../controllers/user');

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

// @route   PUT api/user/:id
// @desc    Update user by id
// @access  Protected
exports.updateUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            throw {
                status: 404,
                msg: 'User not found'
            };
        }
        // update user
        user.about = req.about;
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.msg });
    }
}