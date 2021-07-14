const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Cria a conexão com a DB
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// initializa a conexão com a DB
connection.connect(error => {
  if (error){
    console.error('error connecting: ' + error.stack);
    return;
  }
  console.log("Successfully connected to the database.");
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;