const TaskRepository = require("../repository/taskRepository");

const taskRepository = new TaskRepository();

class TaskController {
  static async createTable(req, res) {
    await taskRepository.createTable();
  }

  static async listAll(req, res) {
    const tasks = await taskRepository.listAll(req.userId);

    return res.json(tasks);
  }

  static async findById(req, res) {
    const task = await taskRepository.findById(req.params.id);

    return res.json(task);
  }

  static async create(req, res) {
    const task = req.body.description;

    await taskRepository.create(task, req.userId);

    return res.status(201).json({ message: "Task created successfully" });
  }

  static async update(req, res) {
    const id = req.params.id;
    const description = req.body.description;

    const found = await taskRepository.findById(id);

    if (!found) return res.status(404).json({ message: "taskId not exists" });

    await taskRepository.update(id, description);

    return res.json({
      id,
      description,
    });
  }

  static async delete(req, res) {
    const id = req.params.id;

    const found = await taskRepository.findById(id);

    if (!found) return res.status(404).json({ message: "taskId not exists" });

    await taskRepository.delete(id);

    return res.status(200).json({ message: "Task deleted successfully" });
  }
}

module.exports = TaskController;
