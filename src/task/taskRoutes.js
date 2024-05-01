const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const TaskController = require("./TaskController");

const taskRouter = express.Router();

TaskController.createTable();

taskRouter.get("/", TaskController.listAll);

taskRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  TaskController.listById
);

module.exports = taskRouter;
