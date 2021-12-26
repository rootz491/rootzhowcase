const express = require('express');
const {sendMail} = require('../controllers/email');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/send', (req, res) => {
    const options = {
        to: 'experimentyt1@gmail.com',                    // Change to your verified sender
        from: 'karansh491@gmail.com',                          // Change to your recipient
        subject: 'testing email sending feature',
        text: 'something idk what!',
        html: '<h1>Hii I\'m Karan, this is my testing for new feature.',
    }
    // sendMail(options);
    res.send('done');
});

module.exports = router;