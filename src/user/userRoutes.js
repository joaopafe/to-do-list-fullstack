const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyIfExistsBody = require("../middleware/verifyIfExistsBody");

const UserController = require("./UserController");

const userRouter = express.Router();

UserController.createTable();

userRouter.get("/", (req, res) => res.json({ message: "ok" }));

userRouter.post(
  "/",
  verifyIfExistsBody,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(4).required(),
      password: Joi.string().min(4).required(),
    }),
  }),
  UserController.create
);

module.exports = userRouter;
