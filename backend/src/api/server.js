const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();
// BodyParser foi deprecated, mas tenho que usar ele aqui, provavelmente fiz algo errado em algum canto
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Arrumando o erro cors, caso vá hostear, vou ter q usar isso
// var whitelist = ['http://localhost:3000', 'http://localhost:4200']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       console.log(origin)
//       callback(new Error('Not allowed by CORS' + origin))
//     }
//   }
// }

//   app.use(cors(corsOptions))

app.use(cors())

// Rota simples inicial
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo a api" });
});

require("./routes/category.routes.js")(app);
require("./routes/device.routes.js")(app);

// porta para ouvir requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});