const express = require('express');
const { initPayment, handlePayment } = require('../controllers/payment');
const { isAuthenticated, isVerified } = require('../middlewares/auth');
const router = express.Router();

router.get('/', isAuthenticated, isVerified, (req, res) => {
    initPayment(req, res);
});

router.post('/webhook', (req, res) => {
    handlePayment(req, res);
});

//  TODO instead of showing these messages, send a static page with the message to user!
router.get('/success', (req, res) => {
    res.send('payment success, now you can access all project\'s source code 😁');
})

router.get('/cancel', (req, res) => {
    res.send('payment cancelled successfully');
})

module.exports = router;