const Device = require("../models/device.model.js");

// Cria uma nova categoria
//Essa é a unica função que vai receber um json no body do request, pois precisa carregar mais informações
exports.create = (req, res) => {
    // Valida o request
    let flag = 0;
    if (!req.body) {//se não há request ou tem mas sem corpo
        res.status(400).send({
            message: "Content can not be empty!" //pode ser vazio não
        });
    } else {

        //Validação dos campos


        //Checagem do tamanho da string da cor
        if (req.body.color) {
            if ((req.body.color).length > 16) {
                flag = 1;
                res.status(400).send({
                    message: "Color must be less than 16 characters" //pode ser vazio não
                });
            }
            // Checa se há um caracter que não seja letras
            const regexLetters = new RegExp("[^A-Za-z]+");
            if (regexLetters.test(req.body.color)) {
                flag = 1;
                res.status(400).send({
                    message: "Color must be only letters" //pode ser vazio não
                });
            }
        }else{
            flag = 1;
            res.status(400).send({
                message: "Missing Color field!" //pode ser vazio não
            });
        }

        if(req.body.partNumber){
            if(!Number.isInteger(req.body.partNumber)){
                flag = 1;
                res.status(400).send({
                    message: "Field partNum must be a number!" + req.body //pode ser vazio não
                });
            }else{
                if(req.body.partNumber < 0){
                    flag = 1;
                    res.status(400).send({
                        message: "Field partNum must be a positive number!" //pode ser vazio não
                    }); 
                }
            }
        }else{
            flag = 1;
            res.status(400).send({
                message: "Missing Part Number field!" //pode ser vazio não
            });
        }

        if(!req.body.ID_Category){
            flag = 1;
            res.status(400).send({
                message: "Missing category field!" //pode ser vazio não
            });
        }
    }



    if(flag == 0){
    // Cria uma categoria
        const device = new Device({
            color: req.body.color,
            partNumber: req.body.partNumber,
            ID_Category: req.body.ID_Category
        });

        // Salva a categoria na DB
        Device.create(device, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Device."
                });
            else res.send(data);
        });
    }
};
// Todas as proximas funções recebem parametros pelo URL pois ou não há parametros ou o parametro é unico
// Obtem todas as categorias da database
exports.findAll = (req, res) => {
    Device.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Devices."
            });
        }
        else res.send(data);
    })
};

// Encontra uma unica categoria com um ID
exports.findById = (req, res) => {
    //Inves de utilizar um body no request, o id é inserido no url
    Device.findById(req.params.deviceId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.deviceId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Device with id " + req.params.deviceId
                });
            }
        } else res.send(data);
    });
};

// As operações de deletar, caso haja alguma forma de autenticação, ela seria recebida pelo body do request

// Deleta uma categoria com um ID
exports.deleteById = (req, res) => {
    Device.remove(req.params.deviceId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.deviceId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Device with id " + req.params.deviceId
                });
            }
        } else res.send({ message: `Device was deleted successfully!` });
    });
};

// Deleta todas as categorias
exports.deleteAll = (req, res) => {
    Device.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        else res.send({ message: `All Devices were deleted successfully!` });
    });
};