const express = require('express');
const router = express.Router();
const { getUsers, createUser, userLogin } = require('../controllers/userController');

router.get('/', getUsers);

router.post('/register', createUser);

router.post('/login', userLogin);

module.exports = router;
