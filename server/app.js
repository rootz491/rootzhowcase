const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {connect} = require('./configs/mongodb');
require('dotenv').config({ path: '../.env' });

//  connect to DB
connect();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/verification', require('./routes/verification'));
app.use('/api/reset', require('./routes/reset'));

app.listen(1337, () => {
    console.log('Server running on port 1337');
});