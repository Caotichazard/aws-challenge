const sql = require("./db.js");

// Construtor
const Device = function (device) {
    this.color = device.color;
    this.partNumber = device.partNumber;
    this.ID_Category = device.ID_Category;
};

//Adiciona categoria nova
Device.create = (newDevice, result) => {
    sql.query({
        sql: "INSERT INTO devices SET ?", //Query a usar
        values: [newDevice],//Valores a colocar no lugar do ?
    },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created device: ", { id: res.insertId, ...newDevice });
            result(null, { id: res.insertId, ...newDevice });
        });
};

//Busca por id
Device.findById = (deviceId, result) => {
    sql.query(
        {
            sql: `SELECT * FROM devices WHERE ID_Device = ${deviceId}`,
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found device: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Device with the id
            result({ kind: "not_found" }, null);
        });
};

//Busca todos
Device.getAll = result => {
    sql.query(
        {
            sql: "SELECT * FROM devices",
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("device: ", res);
            result(null, res);
        });
};

//Remove por id
Device.remove = (id, result) => {
    sql.query(
        {
            sql: "DELETE FROM devices WHERE ID_Device = ?",
            values: [id],
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Device with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted device with id: ", id);
            result(null, res);
        });
};

//Remove todos
Device.removeAll = result => {
    sql.query(
        {
            sql: "DELETE FROM devices",
        },
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} device`);
            result(null, res);
        });
};

module.exports = Device;