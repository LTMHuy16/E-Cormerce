const validator = require('validator');
const mongoose = require('mongoose');

function checkRequireFields(fields, reqBody) {
  if (!fields || !reqBody) return;

  let emptyFields = [];

  if (Array.isArray(fields))
    fields.forEach((field) => {
      if (!reqBody[field]) emptyFields.push(field);
    });
  else if (!reqBody[fields]) emptyFields.push(fields);

  if (emptyFields.length == 1)
    throw new Error(`Field '${emptyFields[0]}' is required.`);
  if (emptyFields.length > 1)
    throw new Error('Please enter all required fields.');
}

function validatorEmail(email) {
  const isEmail = validator.isEmail(email);

  if (!isEmail) throw Error('Email is invalid');
}

function validatorPassword(password) {
  const isValidPassword = validator.isStrongPassword(password);

  if (!isValidPassword) throw Error('Password is not strong enough.');
}

function checkMongooseId(id, fieldName) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    if (fieldName) throw new Error(`${fieldName} id is not valid.`);
    else throw new Error(`Id is not valid.`);
  }
}

module.exports = {
  validatorEmail,
  validatorPassword,
  checkRequireFields,
  checkMongooseId,
};
