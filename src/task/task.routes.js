const express = require("express");

const TaskController = require("./TaskController");

const taskRouter = express.Router();

taskRouter.get("/", TaskController.listAll);

module.exports = taskRouter;
