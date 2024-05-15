const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY || "task_api";

const authentication = (req, res, next) => {
  console.log("A porra do req:" + req);

  if (!req.headers.authorization)
    res.status(401).json({ message: "Unauthorized" });

  const token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, privateKey, (err, decode) => {
    if (err) res.status(401).json({ message: "Unauthorized" });

    if (decode.userId) req.userId = decode.userId;
  });

  next();
};

module.exports = authentication;
