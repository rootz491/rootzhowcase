const path = require('path');
const express = require('express');
const { requestReset, requestResetByToken, doReset } = require('../controllers/reset');
const { isAuthenticated, isVerified } = require('../middlewares/auth');
const router = express.Router();

router.get('/', isAuthenticated, isVerified, async (req, res) => {
    requestResetByToken(req, res);
})

router.post('/', async (req, res) => {
    requestReset(req, res);
});


router.post('/:t', async (req, res) => {
    doReset(req, res);
});

router.get('/:token', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../staticPages/resetForm.html'));
});

module.exports = router;