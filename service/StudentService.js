'use strict';

const db = require('../models');
const axios = require('axios');
const servicesConfig = require('../config/servicesConfig');

/**
 * Assign grades to a student
 *
 * body List Assign grades: student ID, subject code, grade, teacher ID
 * studentId Long The ID of the student
 * returns Student
 **/
exports.assignGradesToStudent = function(body,studentId) {
  return new Promise(async function(resolve, reject) {
     try {
          let student = await db.Student.findOne({id: studentId}).exec();

              if (!student) {
                  reject([null, 400]);
              }
              else {

                  let grades = student.grades;
                  for (const gradeAssign of body) {
                      const grade = {
                          subjectCode: gradeAssign.subjectCode,
                          studentId: studentId,
                          teacherId: gradeAssign.teacherId,
                          grade: gradeAssign.grade
                      };

                      if (-1 === grades.findIndex(grade => grade.subjectCode === gradeAssign.subjectCode)) {
                          grades.push(grade);
                      } else {
                          grades = grades.filter(grade => grade.subjectCode !== gradeAssign.subjectCode);
                          grades.push(grade);
                      }
                  }

                  student.grades = grades;

                  student
                      .save()
                      .then(res => {
                          resolve([res, 200]);
                      })
                      .catch(err => {
                              reject([err.message || "An error occurred assigning grades for student " + studentId, 500]);
                          }
                      );
              }
          }
          catch (error) {
         console.error('error = ', error);
              reject([error, 500]);
          }
      });
}


/**
 * Assign a subject to a student
 *
 * body List Assign subjects to the student: identification, subject code, teacher identification 
 * studentId Lon
 * g The ID of the student
 * returns Student
 **/
exports.assignSubjectToStudent = function(body,studentId) {
  return new Promise(async function(resolve, reject) {
      try {
          let subjects = [];
          let student = await db.Student.findOne({id: studentId}).exec();
          if (!student) {
              reject([null, 400]);
          } else {

              for (const subjectAssignment of body) {
                  try {
                      const response = await axios.get(servicesConfig.SUBJECT_SERVICE_URL + '/' + subjectAssignment.code);
                      if (response.status === 200) {
                          if (-1 === subjects.findIndex(subject => subject.code === subjectAssignment.code)) {
                              subjects.push(response.data);
                          }
                      } else {
                          reject([response, response.status]);
                      }
                  } catch (error) {
                      if (error.response.status === 404) {
                          console.error('An existing subject does not exist for ', body);
                          reject([null, 400]);
                      } else {
                          reject([error, 500]);
                      }
                  }
              }

              student.subjects = subjects;

              student
                  .save()
                  .then(res => {
                      resolve([res, 200]);
                  })
                  .catch(err => {
                          reject([err.message || "An error occurred assigning subjects for student " + studentId, 500]);
                      }
                  );
          }
      }
      catch (error) {
          reject([error, 500]);
      }
  });
}


/**
 * Creates a student
 *
 * body Student Create student: student ID, name, teacher ID (optional)
 * returns List
 **/
exports.createStudent = function(body) {
  return new Promise(function(resolve, reject) {
      const student = new db.Student({
            id: body.id,
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            teacherId: body.teacherId
      });

     exports.getStudent(body.id)
         .then(function (response) {
             // already have a student
             reject([null, 405]);
          })
          .catch(function (response) {
              let [arg1, arg2] = response;
              if (arg2 && arg2 === 404) {
                  student
                      .save()
                      .then ( res => {
                          resolve([res, 201]);
                      })
                      .catch(err => {
                              reject([err.message || "An error occurred saving a student with " + body, 500]);
                          }
                      );
              }
              else {
                  reject([arg1, arg2]);
              }
          });
  });
}

/**
 * Deletes a subject assignment for a specific student
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns Student
 **/
exports.deleteASubjectForStudent = function(studentId,subjectCode) {
    return new Promise(async function(resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            }
            else {
                student.subjects = student.subjects.filter(subject => subject.code !== subjectCode);

                student
                    .save()
                    .then ( res => {
                        resolve([res, 200]);
                    })
                    .catch(err => {
                            reject([err.message || "An error occurred deleting subject for subject " + subjectCode, 500]);
                        }
                    );
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}


/**
 * Deletes a specific student
 *
 * studentId Long The ID of the student
 * returns Student
 **/
exports.deleteStudent = function(studentId) {
    return new Promise(async function(resolve, reject) {

        try {
            let res = await db.Student.findOneAndRemove({id: studentId}).exec();
            if (res) {
                resolve([res, 200]);
            }
            else {
                reject([null, 404]);
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}

/**
 * deletes a grade the student has for assigned subject
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns List
 **/
exports.deleteGradeForStudentSubject = function(studentId,subjectCode) {
    return new Promise(async function(resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
                if (!student) {
                    reject([null, 400]);
                }
                else {
                        student.grades = student.grades.filter(grade => grade.subjectCode !== subjectCode);

                        student
                        .save()
                        .then ( res => {
                            resolve([res, 200]);
                        })
                        .catch(err => {
                                reject([err.message || "An error occurred deleting grade for subject " + subjectCode, 500]);
                            }
                        );
                }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}

/**
 * returns a grade the student has for assigned subject
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns List
 **/
exports.getGradeForStudentSubject = function(studentId,subjectCode) {
    return new Promise(async function(resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            }
            else {
                let grade = student.grades.filter(grade => grade.subjectCode === subjectCode);

                if (grade) {
                    resolve([grade, 200]);
                }
                else {
                    reject([null, 404]);
                }
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}

/**
 * Gets a specific student
 *
 * studentId Long The ID of the student
 * returns Student
 **/
exports.getStudent = function(studentId) {
    return new Promise(function(resolve, reject) {
        let query = { id: studentId };
        db.Student.findOne(query).then( res => {
            res ? resolve([res]) : reject([null, 404]);
        })
            .catch(err => {
                reject([err.message || "An error occurred getting student for " + studentId, 500]);
            });
    });
}


/**
 * Gets students
 *
 * returns List
 **/
exports.getStudents = function() {
    return new Promise(function(resolve, reject) {
        db.Student.find().then( res => {
            res && res.length > 0 ? resolve([res]) : reject([null, 404]);
        })
            .catch(err => {
                reject([err.message || "An error occurred getting students ", 500]);
            });
    });
}


/**
 * Gets a specific subject for a student
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns Student
 **/
exports.getSubjectForStudent = function(studentId,subjectCode) {
    return new Promise(async function(resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            }
            else {
                let subject = student.subjects.filter(subject => subject.code === subjectCode);

                if (subject) {
                    resolve([subject, 200]);
                }
                else {
                    reject([null, 404]);
                }
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}


/**
 * Updates a specific student
 *
 * studentId Long The ID of the student
 * returns Student
 **/
exports.updateStudent = function(body, studentId) {
    return new Promise(async function(resolve, reject) {
        try {
             let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            } else {

                if (body.firstName) {
                student.firstName = body.firstName;
                }

                if (body.lastName) {
                    student.lastName = body.lastName;
                }

                if (body.age) {
                    student.age = body.age;
                }

                if (body.teacherId) {
                    student.teacherId = body.teacherId;
                }

                student
                    .save()
                    .then(res => {
                        resolve([res, 200]);
                    })
                    .catch(err => {
                            reject([err.message || "An error occurred updating student " + studentId, 500]);
                        }
                    );
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}


/**
 * Updates a specific subject assignment for a student
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns Student
 **/
exports.updateSubjectAssignmentForStudent = function(body, studentId,subjectCode) {
    return new Promise(async function(resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            } else {

                let subject = student.subjects.find(subject => subject.code === subjectCode)

                if (!subject || subject.length === 0) {
                    reject([null, 404]);
                }

            if (body.teacherId) {
                subject.teacherId = body.teacherId;
            }

            if (body.description) {
                subject.description = body.description;
            }

             student
                    .save()
                    .then(res => {
                        resolve([res, 200]);
                    })
                    .catch(err => {
                            reject([err.message || "An error occurred assigning subjects for student " + studentId, 500]);
                        }
                    );
            }
        }
        catch (error) {
            reject([error, 500]);
        }
    });
}


/**
 * updates a grade the student has for assigned subject
 *
 * studentId Long The ID of the student
 * subjectCode String The code of the subject
 * returns List
 **/
exports.updateGradeForStudentSubject = function(body, studentId, subjectCode) {
    return new Promise(async function (resolve, reject) {
        try {
            let student = await db.Student.findOne({id: studentId}).exec();
            if (!student) {
                reject([null, 400]);
            } else {

                let grade = student.grades.find(grade => grade.subjectCode === subjectCode)

                if (!grade || student.length === 0) {
                    reject([null, 404]);
                }

                if (body.teacherId) {
                    grade.teacherId = body.teacherId;
                }

                if (body.grade) {
                    grade.grade = body.grade;
                }

                student
                    .save()
                    .then(res => {
                        resolve([res, 200]);
                    })
                    .catch(err => {
                            reject([err.message || "An error occurred updating the grade for subject " + subjectCode, 500]);
                        }
                    );
            }
        } catch (error) {
            reject([error, 500]);
        }
    });
}

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

