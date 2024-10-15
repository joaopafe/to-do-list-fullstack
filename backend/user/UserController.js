const jwt = require("jsonwebtoken");

const UserRepository = require("../repository/userRepository");
const HashProvider = require("../providers/HashProvider");

const privateKey = process.env.PRIVATE_KEY || "task_api";
const userRepository = new UserRepository();

class UserController {
  static async createTable() {
    await userRepository.createTable();
  }

  static async create(req, res) {
    const username = req.body.username;
    const password = await HashProvider.hash(req.body.password);

    await userRepository.create(username, password);

    return res.status(201).json({ message: "User created successfully" });
  }

  static async update(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userRepository.findByUsername(username);

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await HashProvider.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    const newPassword = await HashProvider.hash(req.body.newPassword);

    await userRepository.update(username, newPassword);

    return res.status(200).json({ message: "Password updated successfully" });
  }

  static async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userRepository.findByUsername(username);

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await HashProvider.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, privateKey, {
      expiresIn: 10_080,
    });

    return res.json({ auth: true, token });
  }
}

module.exports = UserController;
