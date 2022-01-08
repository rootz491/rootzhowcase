const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const {connect} = require('./configs/mongodb');
const { isAuthenticated, isVerified } = require('./middlewares/auth');
require('dotenv').config({ path: '../.env' });

//  connect to DB
const app = express();
connect();

//  middlewares
app.use('/api/payment/webhook', bodyParser.raw({type: "*/*"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// app.use(helmet());

//  serve static files in production env
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

//  routes
app.use('/api/', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/verification', require('./routes/verification'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/reset', require('./routes/reset'));
app.use('/api/projects', isAuthenticated, isVerified, require('./routes/project'));
app.use('/api/user', isAuthenticated, require('./routes/user'));

app.use('*', (req, res) => {
    res.redirect('/');
    // res.status(404).json({ message: 'Not Found' });
})

app.listen(1337, () => {
    console.log('Server running on port 1337');
});
