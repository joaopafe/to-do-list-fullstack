const TaskRepository = require("../repository/taskRepository");
const verifyIfExistsBody = require("../services/verifyIfExistsId");

const taskRepository = new TaskRepository();

class TaskController {
  static async createTable(req, res) {
    await taskRepository.createTable();
  }

  static async listAll(req, res) {
    const tasks = await taskRepository.listAll();

    return res.json(tasks);
  }

  static async listById(req, res) {
    const task = await taskRepository.listById(req.params.id);

    return res.json(task);
  }

  static async create(req, res) {
    const task = req.body.description;

    await taskRepository.create(task);

    return res.status(201).json({ message: "Task created successfully" });
  }

  static async update(req, res) {
    const id = req.params.id;
    const description = req.body.description;

    const existsId = await verifyIfExistsBody(id);

    if (existsId == false)
      res.status(404).json({ message: "taskId not exists" });

    await taskRepository.update(id, description);

    return res.json({
      id,
      description,
    });
  }
}

module.exports = TaskController;
