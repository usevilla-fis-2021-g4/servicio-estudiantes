'use strict';

const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {TOKEN_KEY} = require("../config/authConfig");

/**
 * Gets health of the service
 *
 * no response value expected for this operation
 **/
exports.getHealth = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

/**
 * login a user
 *
 * body User Login a user
 * returns User
 **/
exports.login = function(body) {
  return new Promise(async function(resolve, reject) {
    if (!(body.email && body.password)) {
      reject(["Invalid input", 400]);
    }

    let user = await db.User.findOne({email: body.email.toLowerCase()}).exec();

    if (!user) {
      reject(["User not found", 404]);
    }
    else {
      if (await bcrypt.compare(body.password, user.password)) {
        user.token = jwt.sign(
            {user_id: user.id, email: user.email},
            TOKEN_KEY,
            {
              expiresIn: "1h",
            }
        );

        user.save().then(res => {
          res.password = null;
          resolve([res, 200]);
        }).catch(err => {
              reject([err.message || "An error occurred saving a user with " + body, 500]);
            }
        );
      }
      else {
        reject(["Unauthorised", 401]);
      }
    }
  });
}


/**
 * logout a user
 *
 * body User Logout a user (optional)
 * returns User
 **/
exports.logout = function(body) {
    return new Promise(async function(resolve, reject) {
      if (!(body.email && body.token)) {
        reject(["Invalid input", 400]);
      }

      try {
        await exports.verify(body);
      }
      catch (error) {
        reject(error);
      }

      let user = await db.User.findOne({email: body.email.toLowerCase()}).exec();

      if (!user) {
        reject(["User not found", 404]);
      }
      else {
          user.token = null;
          user.save().then(res => {
            res.password = null;
            resolve([res, 200]);
          }).catch(err => {
                reject([err.message || "An error occurred saving a user with " + body, 500]);
              }
          );
      }
    });
}

/**
 * registers a user
 *
 * body UserRegistration Register a user (optional)
 * returns UserRegistration
 **/
exports.register = function(body) {
  return new Promise(async function(resolve, reject) {
    if (!(body.firstName && body.lastName && body.email && body.password)) {
      reject(["Invalid input", 400]);
    }

    let existingUser = await db.User.findOne({email: body.email.toLowerCase()}).exec();
    if (existingUser) {
      reject(["User already exists", 409]);
    }
    else {
      let encryptPwd = await bcrypt.hash(body.password, 10);
      const user = new db.User({
        id: body.id,
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        password: encryptPwd,
        email: body.email.toLowerCase()
      });

      user.save().then ( res => {
        res.password = null;
        resolve([res, 201]);
      })
          .catch(err => {
                reject([err.message || "An error occurred registering a user with " + body, 500]);
              }
          );
    }
  });
}


/**
 * unregister a user
 *
 * body User Unregister a user
 * returns User
 **/
exports.unregister = function(body) {
  return new Promise(async function(resolve, reject) {
    if (!(body.email && body.password)) {
      reject(["Invalid input", 400]);
    }

    let user = await db.User.findOne({email: body.email.toLowerCase()}).exec();

    if (!user) {
      reject(["User not found", 404]);
    }
    else {
      if (await bcrypt.compare(body.password, user.password)) {
        user.delete().then( res => {
          res.password = null;
          resolve([res, 200]);
        }). catch(err => {
              reject([err.message || "An error occurred unregistering a user with " + body, 500]);
            }
        );
      }
      else {
        reject(["Unauthorised", 401]);
      }
    }
  });
}

/**
 * verify a user
 *
 * body User Verify a user
 * returns User
 **/
exports.verify = function(body) {
  return new Promise( async function(resolve, reject) {
    console.log("about to verify token ", body.token);
    if (!body.token && !body.email) {
      reject(["Invalid input", 400]);
    }
    try {
      console.log("about to verify token ", body.token);
      jwt.verify(body.token, TOKEN_KEY);

      console.log("About to find a user using ", body);

      let user = await db.User.findOne({email: body.email.toLowerCase()}).exec();

      console.log("user is ", user);

      if (!user) {
        reject(["User not found", 404]);
      }
      else {
        if (user.token === body.token) {
          resolve();
        }
        else {
          console.log("tokens don't match");
          return reject(["Not Authorised", 401]);
        }
      }
    } catch (err) {
      console.error("Not authorised", err);
      return reject(["Not Authorised", 401]);
    }
  });
}
