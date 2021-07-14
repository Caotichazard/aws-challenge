const Category = require("../models/category.model.js");

// Cria uma nova categoria
//Essa é a unica função que vai receber um json no body do request, pois precisa carregar mais informações
exports.create = (req, res) => {
    // Valida o request
    if (!req.body) {//se não há request ou tem mas sem corpo
        res.status(400).send({
            message: "Content can not be empty!" //pode ser vazio não
        });
    }else{
        if(req.body.name){
            const category = new Category({
                name: req.body.name,
            });
    
            // Salva a categoria na DB
            Category.create(category, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Category."
                    });
                else res.send(data);
            });
        }else{
            res.status(400).send({
                message: "Missing Name field!" //pode ser vazio não
            });
        }
        // Cria uma categoria
        
    }
};
// Todas as proximas funções recebem parametros pelo URL pois ou não há parametros ou o parametro é unico
// Obtem todas as categorias da database
exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Categories."
            });
        }
        else res.send(data);
    })
};

// Encontra uma unica categoria com um ID
exports.findById = (req, res) => {
    //Inves de utilizar um body no request, o id é inserido no url
    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.categoryId
                });
            }
        } else res.send(data);
    });
};

// As operações de deletar, caso haja alguma forma de autenticação, ela seria recebida pelo body do request

// Deleta uma categoria com um ID
exports.deleteById = (req, res) => {
    Category.remove(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Category with id " + req.params.categoryId
                });
            }
        } else res.send({ message: `Category was deleted successfully!` });
    });
};

// Deleta todas as categorias
exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        else res.send({ message: `All Categories were deleted successfully!` });
    });
};