const express = require('express');
const { resend, verify } = require('../controllers/verification');
const router = express.Router();

router.post('/resend', (req, res) => {
    resend(req, res);
});

router.get('/:t', (req, res) => {
    verify(req, res);
});

module.exports = router;