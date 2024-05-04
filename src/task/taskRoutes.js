const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyIfExistsBody = require("../middleware/verifyIfExistsBody");

const TaskController = require("./TaskController");
const existsId = require("../services/verifyIfExistsId");

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

taskRouter.post(
  "/",
  verifyIfExistsBody,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(4).required(),
    }),
  }),
  TaskController.create
);

taskRouter.put(
  "/:id",
  verifyIfExistsBody,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(4).required(),
    }),
  }),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  TaskController.update
);

module.exports = taskRouter;
