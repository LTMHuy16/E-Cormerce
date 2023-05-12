const mongoose = require('mongoose');

function errorHandler(error, req, res, next) {
  if (!error) return;

  let errorObj = error,
    status = 500;

  if (error.name == 'UnauthorizedError') {
    errorObj = { message: 'The user is not authorized.' };
    status = 401;
  }

  if (Object.keys(errorObj) == 0) errorObj = { error: 'Something when wrong.' };

  res.status(status).json(errorObj);
}

module.exports = { errorHandler };
