module.exports = app => {
    const category = require("../controllers/category.controller.js");
  
    // Cria nova categoria
    app.post("/category", category.create);
  
    // Obter todas as categorias
    app.get("/category", category.findAll);
  
    // Obtem uma unica categoria baseada no ID
    app.get("/category/:categoryId", category.findById);

  
    // Deleta uma Categoria Baseada no ID
    app.delete("/category/:categoryId", category.deleteById);
  
    // Deleta todas as Categorias
    app.delete("/category", category.deleteAll);
  };