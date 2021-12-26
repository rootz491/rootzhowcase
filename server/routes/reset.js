const express = require('express');
const { requestReset, doReset } = require('../controllers/reset');
const router = express.Router();

router.post('/', async (req, res) => {
    requestReset(req, res);
});

router.post('/:t', async (req, res) => {
    doReset(req, res);
});

router.get('/:token', async (req, res) => {
    // send reset password form that will make post request to /api/reset/:token
    res.send(`later`);
});

module.exports = router;