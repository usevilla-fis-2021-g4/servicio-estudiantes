const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.MONGO_URL;
console.log("dbConfig.MONGO_URL = " + dbConfig.MONGO_URL);
db.Student = require("./Student.js")(mongoose);

module.exports = db;
