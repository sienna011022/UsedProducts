const mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Rlatjddbs123!",
    database : "usedProduct",

});
db.connect();

module.exports = db;
