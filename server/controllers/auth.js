const { getUserWithPwd, createUser } = require('../services/user');
const {sendVerificationMail} = require('./email');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // verify all fields
        if (!username || !email || !password) {
            throw {
                msg: 'Please enter all fields',
                status: 400
            }
        }
        // check if user already exists
        const user = await getUserWithPwd(email);
        if (user) {
            throw {
                msg: 'User already exists',
                status: 400
            }
        }
        // create new user
        const newUser = await createUser(email, password, username);
        if (!newUser) { 
            throw {
                msg: 'User could not be created, try again later',
                status: 400
            }
        }
        // create token send verificatioin email
        const verToken = await newUser.genVerificationToken();
        sendVerificationMail(newUser.email, verToken.token);
        // send response
        res.status(201).json({msg: 'User created successfully & verification token has been sent, please verify your email before login!'});

    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // verify all fields
        if (!email || !password) {
            throw {
                msg: 'Please enter all fields',
                status: 400
            }
        }
        // find user
        const user = await getUserWithPwd(email);
        if (!user) {
            throw {
                msg: 'User does not exist',
                status: 400
            }
        }
        // check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw {
                msg: 'Password is incorrect',
                status: 400
            }
        }
        // check if user is verified
        if (!user.isVerified) {
            throw {
                msg: 'User is not verified',
                status: 400
            }
        }
        // generate JWt token
        const token = await user.genJwtToken();
        // send response
        res.status(200).json({token});
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}
