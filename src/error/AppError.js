/**
 * Application class to handle errors.
 * @param message error message.
 * @param status error HTTP status (default to 400).
 */
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
  }
}

module.exports = AppError;
