module.exports = app => {
    const category = require("../controllers/category.controller.js");

    // Cria nova categoria
    app.post("/categories", category.create);

    // Obter todas as categorias
    app.get("/categories", category.findAll);

    // Obtem uma unica categoria baseada no ID
    app.get("/categories/:categoryId", category.findById);


    // Deleta uma Categoria Baseada no ID
    app.delete("/categories/:categoryId", category.deleteById);

    // Deleta todas as Categorias
    app.delete("/categories", category.deleteAll);
};