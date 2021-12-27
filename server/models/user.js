const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Token = require('./token');

const userSchema = new mongoose.Schema({
    stripeId: {
        type: String,
        default: ''
    },
    username: {
        unique: false,
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        unique: true,
        type: String,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    profileImage: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isPro: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: {
        type: String,
        required: false
    },
    passwordResetExpires: {
        type: Date,
        required: false
    }
});

// hashing password
userSchema.pre('save', function (next) {
    const user = this;

    // if password not modified, skip hashing 
    if (!user.isModified('password')) return next();

    // if password is modified, hash it
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    console.log(this.password);
    return bcrypt.compare(candidatePassword, this.password);
    // return true;
};

// generate password reset token
userSchema.methods.genPwdResetToken = function () {
    this.passwordResetToken = crypto.randomBytes(32).toString('hex');   // passwd reset token is a random string
    this.passwordResetExpires = Date.now() + 3600000; // 1 hour    
    this.save();
}

// generate verification token
userSchema.methods.genVerificationToken = function () {  
    const payload = {
        userId: this._id,
        token: crypto.randomBytes(32).toString('hex')
    }
    const token = new Token(payload);                                          //  verification token has a data structure
    return token.save();                                                       //  save it to database
}

// generate jwt token
userSchema.methods.genJwtToken = function () {
    const isAdmin = this.email === process.env.ADMIN_EMAIL ? true : false;  //  check if current user is admin (me)
    try {
        const token = jwt.sign(
            {                       // payload
                _id: this._id,
                username: this.username,
                email: this.email,
                isVerified: this.isVerified,
                isPro: isAdmin ? true : this.isPro, //  if user is admin, isPro is true
                isAdmin 
            }, 
            process.env.JWT_SECRET, // secret
            { expiresIn: "1h" }    // expires in 20 minutes
        );
        return token;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);
