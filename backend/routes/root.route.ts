import express, { type Request, type Response } from "express";
import path from "path";
const router = express.Router();
const __dirname = path.resolve();

router.get("^/$|index(.html)?", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

export default router;
