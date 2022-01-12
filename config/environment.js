'use strict';

function environment () {
    return {
        TEST_MONGODB_URL : "mongodb://127.0.0.1:27017/studentTestDb",
        TEST_SUBJECT_SERVICE_URL : "http://localhost:8081/subjects"
    }
}

module.exports = {
    environment : environment
};
