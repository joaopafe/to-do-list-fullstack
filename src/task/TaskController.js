const tasks = ["Shopping", "Repair the PC", "Walk on the street"];

class TaskController {
  static listAll(req, res) {
    return res.json(tasks);
  }
}

module.exports = TaskController;
