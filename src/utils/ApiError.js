class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    
    // The super(message) call invokes the constructor of the parent Error class and passes the message argument to it.
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
export { ApiError };
