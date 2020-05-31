const ErrorResponse = require('../utils/errorResponse');

//works with catch (error) in routes but not other errors such as !bootcamp in getBootcamp that are for id not found only.
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // making sure enumerable properties are set.
  error.message = err.message;
  error.stack = err.stack;

  // log errors to console in color red
  console.log(err);

  error.message = err.message;

  // Show the Mongoose error name in the console
  console.log('error.name...', error.name);

  // Mongoose bad ObjectId
  if (error.name === 'CastError') {
    const message = `Resource not found with id of ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered.`;
    error = new ErrorResponse(message, 409);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
