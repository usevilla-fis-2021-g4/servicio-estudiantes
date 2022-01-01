let environment  = require('../config/environment').environment();
let localDBUrl   = 'mongodb://localhost:27017/userdb';
let MONGO_URL    = process.env.MONGO_URL || (process.env.NODE_ENV === "test" ? environment.TEST_MONGO_URL : localDBUrl);

module.exports = {
    MONGO_URL
}
