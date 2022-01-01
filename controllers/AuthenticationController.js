'use strict';

var utils = require('../utils/writer.js');
var authenticationService = require('../service/AuthenticationService');

module.exports.getHealth = function getHealth (req, res, next) {
    authenticationService.getHealth()
        .then(function () {
            res.end();
        })
};

module.exports.login = function login (req, res, next, body) {
  authenticationService.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logout = function logout (req, res, next, body) {
  authenticationService.logout(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.register = function register (req, res, next, body) {
  authenticationService.register(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.unregister = function unregister (req, res, next, body) {
  authenticationService.unregister(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.verify = function verify (req, res, next, body) {
    authenticationService.verify(body)
        .then(function () {
            res.end();
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
