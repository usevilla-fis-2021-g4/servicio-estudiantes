module.exports = mongoose => {
    const studentSchema = mongoose.Schema({
            _id: Number,
            firstName: String,
            lastName: String,
            age: Number,
            teacherId: Number,
            subjects: [{
                code: String,
                teacherId: Number,
                description: String,
            }],
            grades: [{
                studentId: Number,
                subjectCode: String,
                grade: String,
                teacherId: Number
            }]
        }, {
            timestamps: true
        }
    );

    return mongoose.model("Student", studentSchema);
};

