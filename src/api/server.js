const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// BodyParser foi deprecated, mas tenho que usar ele aqui, provavelmente fiz algo errado em algum canto
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota simples inicial
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a api" });
});

require("./routes/category.routes.js")(app);

// porta para ouvir requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});