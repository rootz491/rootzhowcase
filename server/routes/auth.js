const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();

router.post('/signup', async (req, res) => {
    register(req, res);
});

router.post('/login', async (req, res) => {
    login(req, res);
});

module.exports = router;