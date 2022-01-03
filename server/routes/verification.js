const express = require('express');
const { resend, verify } = require('../controllers/verification');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.post('/resend', isAuthenticated, (req, res) => {
    resend(req, res);
});

router.get('/:t', (req, res) => {
    verify(req, res);
});

module.exports = router;