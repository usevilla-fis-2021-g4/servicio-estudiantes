'use strict';

const path = require('path');
const http = require('http');

const oas3Tools = require('oas3-tools');
const serverPort = 8083;

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the db");
    })
    .catch(err => {
        console.error("Cannot connect to the db", err);
        process.exit();
    });

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// for testing
module.exports = app

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('authentication-service is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});


