const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const {connect} = require('./configs/mongodb');
const { isAuthenticated } = require('./middlewares/auth');
require('dotenv').config({ path: '../.env' });

//  connect to DB
connect();
const app = express();

//  middlewares
app.use('/api/payment/webhook', bodyParser.raw({type: "*/*"}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//  routes
app.use('/api/', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/verification', require('./routes/verification'));
app.use('/api/reset', require('./routes/reset'));
app.use('/api/projects', isAuthenticated, require('./routes/project'));
app.use('/api/payment', require('./routes/payment'));

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
})

app.listen(1337, () => {
    console.log('Server running on port 1337');
});
