'use strict';

function environment () {
    return {
        TEST_MONGO_URL : "mongodb://127.0.0.1:27017/userTestDb",
        TEST_TOKEN_KEY : "TEST_TOKEN_KEY"
    }
}

module.exports = {
    environment : environment
};
