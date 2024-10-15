const verifyIfExistsBody = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: "Body is required" });
  next();
};

module.exports = verifyIfExistsBody;
