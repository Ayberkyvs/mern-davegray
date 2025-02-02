import express from "express";
import type { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import corsOptions from "./config/corsOptions.ts";
import connectDB from "./config/dbConn.ts";

import errorHandler from "./middleware/errorHandler.ts";
import { logger, logEvents } from "./middleware/logger.ts";

import root from "./routes/root.route.ts";
import userRoutes from "./routes/user.routes.ts";

dotenv.config();
connectDB();
const __dirname = path.dirname(import.meta.filename);
const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
// express.static is a built-in middleware function in Express. It serves static files and is based on serve-static.
// shortend version of app.use(express.static('public'));
app.use("/", root);
app.use("/users", userRoutes);
app.all("*", (req: Request, res: Response) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.send({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("MongoDB connection established successfully");
	app.listen(PORT, () => console.log("Server is running on port " + PORT));
});

mongoose.connection.on("error", (err) => {
	console.error(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}\n`,
		"mongoErrLog.log"
	);
});
