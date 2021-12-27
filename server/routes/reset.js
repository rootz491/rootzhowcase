const express = require('express');
const { requestReset, doReset } = require('../controllers/reset');
const router = express.Router();

router.post('/', async (req, res) => {
    requestReset(req, res);
});

router.post('/:t', async (req, res) => {
    doReset(req, res);
});

// TODO send password reset form using which user will make post request to /api/reset/:token with new password
router.get('/:token', async (req, res) => {
    res.send(`later`);
});

module.exports = router;