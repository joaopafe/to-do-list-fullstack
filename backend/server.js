const express = require("express");
const cors = require("cors");
const taskRouter = require("./task/taskRoutes");
const { errors } = require("celebrate");
const userRouter = require("./user/userRoutes");
const errorMiddleware = require("./error/errorMiddleware");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: `Listening` }));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

app.use("/task", taskRouter);
app.use("/user", userRouter);

app.use(errors());
app.use(errorMiddleware);
