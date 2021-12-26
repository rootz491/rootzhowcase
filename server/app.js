const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// const {connect} = require('./configs/mongodb');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/', require('./routes/api'));


app.listen(1337, () => {
    console.log('Server running on port 1337');
    //  connect to DB
    // connect();
});