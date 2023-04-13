import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/score/:id", async (req, res) => {
	const { score } = req.body;

	try {
		const user = await UserModel.findById(req.params.id);
		if (user.score > score)
			return res.json({ message: "Last score is bigger" });
		user.score = score;
		await user.save();
		res.status(200).send("Score saved");
	} catch (err) {
		console.error(err);
	}
});

router.get("/get-score/:id", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		res.status(200).json(user.score);
	} catch (err) {
		console.error(err);
	}
});

router.get("/display-name/:id", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		res.status(200).json(user.displayName);
	} catch (err) {
		console.error(err);
	}
});

export { router as scoreRouter };
