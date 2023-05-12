const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { checkRequireFields } = require('../helpers/validator');
const { validatorEmail, validatorPassword } = require('../helpers/validator');

require('dotenv').config();

async function getUsers(req, res) {
  const users = await User.find().select('-password');

  if (!users) res.status(400).json({ error: 'No user was found.' });

  res.status(200).json(users);
}

async function getSingleUser(req, res) {
  try {
    const users = await User.find().select('-password');

    if (!users) res.status(400).json({ error: 'No user was found.' });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: 'No user was found.' });
  }
}

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    checkRequireFields(['name', 'email', 'password', 'phone'], req.body);
    validatorEmail(email);

    const checkExist = await User.findOne({ email });
    if (checkExist) throw Error('Email already used in another account.');

    validatorPassword(password);
    req.body.password = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ ...req.body });
    if (!newUser) throw Error('Cant not create new user.');

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    checkRequireFields(['email', 'password'], req.body);
    validatorEmail(email);

    const user = await User.findOne({ email });

    if (!user) throw Error('Cant not found user.');

    const isSamePass = bcrypt.compareSync(password, user.password);

    if (!isSamePass) throw Error('Password is wrong.');

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_TOKEN,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getUsers, getSingleUser, createUser, userLogin };
