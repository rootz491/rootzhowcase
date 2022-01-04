const express = require('express');
const { getUser, getUserByToken, updateUser } = require('../controllers/user');
const { isVerified } = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
    getUserByToken(req, res);
});

router.get('/:id', isVerified, (req, res) => {
    getUser(req, res);
});

router.put('/', isVerified, (req, res) => {
    updateUser(req, res);
});

module.exports = router;