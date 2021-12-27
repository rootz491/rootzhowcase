const User = require('../models/user');

exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email }, '-password -__v -profileImage -about -createdAt');
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getUserWithPwd = async (email) => {
    try {
        const user = await User.findOne({ email }, '-__v -profileImage -about -createdAt');
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.createUser = async (email, password, username, profileImage, stripeId) => {
    try {
        const newUser = new User({
            username,
            email,
            password,
            profileImage,
            stripeId
        });
        return await newUser.save();
    } catch (error) {
        console.log(error)
        return false;
    }
}

exports.getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password -__v -passwordResetToken -passwordResetExpires -createdAt');
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error)
        return false;
    }
}

exports.getUserByToken = async (token) => {
    try {
        const user = await User.findOne({ passwordResetToken: token }).select('-password -__v -passwordResetToken -passwordResetExpires -profileImage -about');
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error)
        return false;
    }
}

exports.getUserByStripeId = async (stripeId) => {
    try {
        const user = await User.findOne({ stripeId }).select('isPro email');
        if (!user) {
            throw "SERVICE: user not found";
        }
        console.log(user);
        return user;
    } catch (error) {
        console.log(error)
        return false;
    }
}