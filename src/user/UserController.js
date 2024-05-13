const UserRepository = require("../repository/userRepository");

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
}

module.exports = UserController;
