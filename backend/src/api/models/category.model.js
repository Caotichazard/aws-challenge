const sql = require("./db.js");

// Construtor
const Category = function (category) {
    this.name = category.name;
};

//Adiciona categoria nova
Category.create = (newCategory, result) => {
    sql.query({
        sql: "INSERT INTO categories SET ?", //Query a usar
        values: [newCategory],//Valores a colocar no lugar do ?
    },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created category: ", { id: res.insertId, ...newCategory });
            result(null, { id: res.insertId, ...newCategory });
        });
};

//Busca por id
Category.findById = (categoryId, result) => {
    sql.query(
        {
            sql: `SELECT * FROM categories WHERE ID_Category = ${categoryId}`,
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found category: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Category with the id
            result({ kind: "not_found" }, null);
        });
};

//Busca todos
Category.getAll = result => {
    sql.query(
        {
            sql: "SELECT * FROM categories",
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("category: ", res);
            result(null, res);
        });
};

//Remove por id
Category.remove = (id, result) => {
    sql.query(
        {
            sql: "DELETE FROM categories WHERE ID_Category = ?",
            values: [id],
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Category with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted categories with id: ", id);
            result(null, res);
        });
};

//Remove todos
Category.removeAll = result => {
    sql.query(
        {
            sql: "DELETE FROM categories",
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} category`);
            result(null, res);
        });
};

module.exports = Category;