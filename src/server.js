const express = require("express");
const taskRouter = require("./task/task.routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => res.json({ message: `Listening` }));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

app.use("/task", taskRouter);
