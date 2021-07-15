module.exports = app => {
    const device = require("../controllers/device.controller.js");

    // Cria nova categoria
    app.post("/devices", device.create);

    // Obter todas as categorias
    app.get("/devices", device.findAll);

    // Obtem uma unica categoria baseada no ID
    app.get("/devices/:deviceId", device.findById);


    // Deleta uma Categoria Baseada no ID
    app.delete("/devices/:deviceId", device.deleteById);

    // Deleta todas as Categorias
    app.delete("/devices", device.deleteAll);
};