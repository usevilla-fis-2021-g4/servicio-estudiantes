let environment  = require('../config/environment').environment();
let localTokenKey   = 'TOKEN_KEY';
let TOKEN_KEY = process.env.TOKEN_KEY || (process.env.NODE_ENV === "test" ? environment.TEST_TOKEN_KEY : localTokenKey);

module.exports = {
    TOKEN_KEY
}
