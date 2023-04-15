import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/auth.js";
import { scoreRouter } from "./routes/score.js";

dotenv.config();

const MONGO_URI =
	"mongodb+srv://garu48:garu48@game.mmmpgwn.mongodb.net/game?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/user", scoreRouter);

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connection Established"))
	.catch((e) => console.log(e));

export default app;
