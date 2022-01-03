const express = require('express');
const { getUser, updateUser } = require('../controllers/user');
const router = express.Router();

router.get('/', (req, res) => {
    getUser(req, res);
});

router.put('/', isAuthenticated, (req, res) => {
    updateUser(req, res);
});

module.exports = router;