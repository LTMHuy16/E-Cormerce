const express = require('express');
const router = express.Router();
const {
  getUsers,
  countUsers,
  createUser,
  userLogin,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);

router.get('/count', countUsers);

router.post('/register', createUser);

router.delete('/delete/:id', deleteUser);

router.post('/login', userLogin);

module.exports = router;
