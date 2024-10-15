const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY || "task_api";

const authentication = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token == "undefined") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, privateKey, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decode.userId;
  });

  next();
};

module.exports = authentication;
