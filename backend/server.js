const express = require("express");
const taskRouter = require("./task/taskRoutes");
const userRouter = require("./user/userRoutes");
const { errors } = require("celebrate");
const errorMiddleware = require("./error/errorMiddleware");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: `Listening` }));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

app.use("/task", taskRouter);
app.use("/user", userRouter);

app.use(errors());
app.use(errorMiddleware);
