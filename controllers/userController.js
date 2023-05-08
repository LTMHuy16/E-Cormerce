const {
  checkRequireFields,
  checkMongooseId,
} = require('../helpers/handleError');
const { validatorEmail, validatorPassword } = require('../helpers/validator');
const User = require('../models/userModel');

async function getUsers(req, res) {
  const users = await User.find();

  if (!users) res.status(500).json({ error: 'No user was found.' });

  res.status(200).json(users);
}

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    checkRequireFields(['name', 'email', 'passwordHash', 'phone'], req.body);
    validatorEmail(email);
    validatorPassword(password);

    const newUser = await User.create({ ...req.body });

    if (!newUser) throw Error('The user can not be created.');

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getUsers, createUser };
