module.exports = mongoose => {
    const studentSchema = mongoose.Schema({
            id: Number,
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

    studentSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    studentSchema.index({ id: 1}, { unique: true })

    return mongoose.model("Student", studentSchema);
};

