const TaskRepository = require("../repository/taskRepository");

const taskRepository = new TaskRepository();

const verifyIfExistsId = async (id) => {
  const task = await taskRepository.listById(id);

  if (task.length == 0) return false;

  return true;
};

module.exports = verifyIfExistsId;
