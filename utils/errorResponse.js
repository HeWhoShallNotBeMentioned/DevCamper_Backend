class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // call message from Error class
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
