const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => res.json({ message: `Hello World` }));

app.get("/task", (req, res) => {
  res.json({
    tasks: [{ title: "Fazer compras" }, { title: "Consertar o pc" }],
  });
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
