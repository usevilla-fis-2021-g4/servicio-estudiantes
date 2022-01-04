module.exports = mongoose => {
    const userSchema = mongoose.Schema({
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

    userSchema.index({ email: 1}, { unique: true })

    return mongoose.model("User", userSchema);
};

