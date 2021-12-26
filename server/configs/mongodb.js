const mongoose = require('mongoose');

exports.connect = () => {

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log('connected to mongodb successfully!');
        })
        .catch(err => {
            console.log('err while connecting to db: ', err);
        })
    } else {
        console.log('already connected to db');
    }
}