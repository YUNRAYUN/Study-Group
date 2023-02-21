import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    nickname: String,
    password: String
})

UserSchema.virtual("userId").get(() => {
    return this._id.toHexString();
})

UserSchema.set('toJSON', {
    virtuals: true
})

export const User = mongoose.model("User",UserSchema)