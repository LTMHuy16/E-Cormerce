const validator = require('validator');

function validatorEmail(email) {
  const isEmail = validator.isEmail(email);

  if (!isEmail) throw Error('Email is invalid');
}

function validatorPassword(password) {
  const isValidPassword = validator.isStrongPassword(password);

  if (!isValidPassword) throw Error('Password is invalid');
}

module.exports = { validatorEmail, validatorPassword };
