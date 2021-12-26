const Token  = require('../models/token');

exports.getToken = async t => {
    try {
        const token = await Token.findOne({ token: t });
        if (!token) {
            throw "SERVICE: token not found";
        }
        return token;
    } catch (error) {
        console.log(error);
        return false;
    }
}