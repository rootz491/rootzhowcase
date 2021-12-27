const User = require('../models/user');

exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email }, '-password -__v');
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
        const user = await User.findOne({ email }, '-__v');
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.createUser = async (email, password, username) => {
    try {
        const newUser = new User({
            username,
            email,
            password
        });
        return await newUser.save();
    } catch (error) {
        console.log(error)
        return false;
    }
}

exports.getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password -__v');
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
        const user = await User.findOne({ passwordResetToken: token });
        if (!user) {
            throw "SERVICE: user not found";
        }
        return user;
    } catch (error) {
        console.log(error)
        return false;
    }
}