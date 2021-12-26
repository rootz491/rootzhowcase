const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongodb successfully!');
    })
    .catch(err => {
        console.log('err while connecting to db: ', err);
    })
}