let environment  = require('../config/environment').environment();
let localSubjectServiceUrl = 'http://localhost:8081/api/v1/subjects';
let localAuthenticationServiceUrl = 'http://localhost:8083/api/v1/verify';
let SUBJECT_SERVICE_URL = process.env.SUBJECT_SERVICE_URL || (process.env.NODE_ENV === "test" ? environment.TEST_SUBJECT_SERVICE_URL : localSubjectServiceUrl);
let AUTHENTICATION_SERVICE_URL = process.env.AUTHENTICATION_SERVICE_URL || (process.env.NODE_ENV === "test" ? environment.TEST_SUBJECT_SERVICE_URL : localAuthenticationServiceUrl);

module.exports = {
    SUBJECT_SERVICE_URL,
    AUTHENTICATION_SERVICE_URL
}
