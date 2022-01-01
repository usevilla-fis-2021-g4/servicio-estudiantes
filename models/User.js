module.exports = mongoose => {
    const userSchema = mongoose.Schema({
            id: Number,
            firstName: String,
            lastName: String,
            age: Number,
            email: String,
            password: String,
            token: String
        }, {
            timestamps: true
        }
    );

    userSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    userSchema.index({ id: 1}, { unique: true })
    userSchema.index({ email: 1}, { unique: true })

    return mongoose.model("User", userSchema);
};

