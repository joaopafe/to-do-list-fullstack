const UserRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY || "task_api";
const userRepository = new UserRepository();

class UserController {
  static async createTable() {
    await userRepository.createTable();
  }

  static async create(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    await userRepository.create(username, password);

    res.status(201).json({ message: "User created successfully" });
  }

  static async update(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    const rows = await userRepository.update(username, password, newPassword);

    //Validation that the username and password are correct
    if (rows.changes == 0)
      res.status(401).json({ message: "Incorrect username and/or password" });

    if (rows.changes == 1)
      res.status(200).json({ message: "Password updated successfully" });
  }

  static async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const rows = await userRepository.login(username, password);

    //Validation that username and password are correct
    if (rows.length == 0)
      res.status(401).json({ message: "Incorrect username and/or password" });

    if (rows.length == 1) {
      const token = jwt.sign({ userId: rows[0].id }, privateKey, {
        expiresIn: 1800,
      });

      res.json({ auth: true, token });
    }
  }
}

module.exports = UserController;
