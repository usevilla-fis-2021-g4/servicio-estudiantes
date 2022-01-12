const axios = require("axios");
const servicesConfig = require("../config/servicesConfig");

exports.X_USER_ID = 'x-user-id';
exports.X_AUTH_TOKEN = 'x-auth-token';
exports.verify = function(userId, token) {
    return new Promise(async function(resolve, reject) {
        try {
            if (!userId || !token) {
                reject(["Invalid input", 400]);
            }

            let req = {email: userId, token};

            const response = await axios.post(servicesConfig.AUTHENTICATION_SERVICE_URL, req);
            if (response.status === 200) {
                resolve([response, 200]);
            } else {

                reject([response, response.status]);
            }
        } catch (error) {
            if (error.response) {
                reject([error.response.data, error.response.status]);
            }
            else {
                reject([error, 500]);
            }
        }
    });
}
