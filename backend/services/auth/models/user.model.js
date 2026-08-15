import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firebaseUid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    avatar: String
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;