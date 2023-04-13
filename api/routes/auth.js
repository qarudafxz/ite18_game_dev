import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { displayName, username, password } = req.body;
	const user = await UserModel.findOne({ username });

	if (user) return res.status(404).json({ message: "User already existed!" });

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new UserModel({
		displayName,
		username,
		password: hashedPassword,
	});

	await newUser.save();
	res.status(200).json({ newUser, message: "Shesh" });
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await UserModel.findOne({ username });

	if (!user) return res.status(404).json({ message: "User not found!" });

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid)
		return res.status(404).json({ message: "Username or password incorrect" });

	const token = jwt.sign({ userID: user._id }, "secret");
	res.json({ token, userID: user._id, message: "User successfully log in!" });
});

export { router as userRouter };
