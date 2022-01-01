'use strict';

let utils = require('../utils/writer.js');
let studentService = require('../service/StudentService');
const {verify, X_USER_ID, X_AUTH_TOKEN} = require("../middleware/Authentication");

module.exports.assignGradesToStudent = function assignGradesToStudent (req, res, next, body, studentId) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.assignGradesToStudent(body, studentId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.assignSubjectToStudent = function assignSubjectToStudent (req, res, next, body, studentId) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.assignSubjectToStudent(body, studentId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.createStudent = function createStudent (req, res, next, body) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.createStudent(body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.deleteASubjectForStudent = function deleteASubjectForStudent (req, res, next, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.deleteASubjectForStudent(studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.deleteStudent = function deleteStudent (req, res, next, studentId) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.deleteStudent(studentId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.deleteGradeForStudentSubject = function deleteGradeForStudentSubject (req, res, next, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.deleteGradeForStudentSubject(studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getGradeForStudentSubject = function getGradeForStudentSubject (req, res, next, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.getGradeForStudentSubject(studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getStudent = function getStudent (req, res, next, xUserId, xAuthToken, studentId) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.getStudent(studentId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getStudents = function getStudents (req, res, next) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.getStudents()
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getSubjectForStudent = function getSubjectForStudent (req, res, next, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.getSubjectForStudent(studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.updateStudent = function updateStudent (req, res, next, body, studentId) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
    studentService.updateStudent(body, studentId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.updateSubjectAssignmentForStudent = function updateSubjectAssignmentForStudent (req, res, next, body, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.updateSubjectAssignmentForStudent(body, studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.updatesGradeForStudentSubject = function updatesGradeForStudentSubject (req, res, next, body, studentId, subjectCode) {
    verify(req.headers[X_USER_ID], req.headers[X_AUTH_TOKEN]).then( function() {
        studentService.updateGradeForStudentSubject(body, studentId, subjectCode)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }).catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getHealth = function getHealth (req, res, next) {
    studentService.getHealth()
        .then(function () {
            res.end();
        })
};
