const UserRepository = require("../repository/userRepository");

const userRepository = new UserRepository();

class UserController {
  static async createTable() {
    await userRepository.createTable();
  }
}

module.exports = UserController;
