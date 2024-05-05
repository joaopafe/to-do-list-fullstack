const express = require("express");

const UserController = require("./UserController");

const userRouter = express.Router();

UserController.createTable();

userRouter.get("/", (req, res) => res.json({ message: "ok" }));

module.exports = userRouter;
