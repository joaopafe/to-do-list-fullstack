const TaskRepository = require("../repository/taskRepository");

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
}

module.exports = TaskController;
