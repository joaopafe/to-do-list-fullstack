const { CelebrateError } = require("celebrate");
const AppError = require("./AppError");

const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json(err.message);
  }

  if (err instanceof CelebrateError) {
    return res.status(400).json({ message: err.message });
  }

  const message = err instanceof Error ? err.message : String(err);

  return res.status(500).json({ message });
};

module.exports = errorMiddleware;
