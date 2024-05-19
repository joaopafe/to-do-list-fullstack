const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyIfExistsBody = require("../middleware/verifyIfExistsBody");
const authentication = require("../middleware/authetication");

const TaskController = require("./TaskController");

const taskRouter = express.Router();

TaskController.createTable();

taskRouter.get("/", authentication, TaskController.listAll);

taskRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  authentication,
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
  authentication,
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
  authentication,
  TaskController.update
);

taskRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  authentication,
  TaskController.delete
);

module.exports = taskRouter;
