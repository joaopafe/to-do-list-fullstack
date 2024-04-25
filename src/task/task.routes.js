const express = require("express");

const TaskController = require("./TaskController");

const taskRouter = express.Router();

TaskController.createTable();

taskRouter.get("/", TaskController.listAll);

module.exports = taskRouter;
