import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	displayName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	score: { type: Number, default: 0 },
});

export const UserModel = mongoose.model("users", UserSchema);
