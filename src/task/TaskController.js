const TaskRepository = require("../repository/taskRepository");
const verifyIfExistsId = require("../services/verifyIfExistsId");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authetication");

const privateKey = process.env.PRIVATE_KEY || "task_api";
const taskRepository = new TaskRepository();

class TaskController {
  static async createTable(req, res) {
    await taskRepository.createTable();
  }

  static async listAll(req, res, next) {
    authentication(req, res, next);

    const tasks = await taskRepository.listAll(req.userId);

    return res.json(tasks);
  }

  static async listById(req, res) {
    const task = await taskRepository.listById(req.params.id);

    return res.json(task);
  }

  static async create(req, res) {
    if (!req.headers.authorization)
      res.status(401).json({ message: "Unauthorized" });

    const token = req.headers.authorization.replace("Bearer ", "");

    jwt.verify(token, privateKey, (err, decode) => {
      if (err) res.status(401).json({ message: "Unauthorized" });

      req.userId = decode.userId;
    });

    const task = req.body.description;
    const userId = req.userId;

    await taskRepository.create(task, userId);

    return res.status(201).json({ message: "Task created successfully" });
  }

  static async update(req, res) {
    if (!req.headers.authorization)
      res.status(401).json({ message: "Unauthorized" });

    const token = req.headers.authorization.replace("Bearer ", "");

    jwt.verify(token, privateKey, (err) => {
      if (err) res.status(401).json({ message: "Unauthorized" });
    });

    const id = req.params.id;
    const description = req.body.description;

    const existsId = await verifyIfExistsId(id);

    if (existsId == false)
      res.status(404).json({ message: "taskId not exists" });

    await taskRepository.update(id, description);

    return res.json({
      id,
      description,
    });
  }

  static async delete(req, res) {
    if (!req.headers.authorization)
      res.status(401).json({ message: "Unauthorized" });

    const token = req.headers.authorization.replace("Bearer ", "");

    jwt.verify(token, privateKey, (err) => {
      if (err) res.status(401).json({ message: "Unauthorized" });
    });

    const id = req.params.id;

    const existsId = await verifyIfExistsId(id);

    if (existsId == false)
      res.status(404).json({ message: "taskId not exists" });

    await taskRepository.delete(id);

    return res.status(200).json({ message: "Task deleted successfully" });
  }
}

module.exports = TaskController;
