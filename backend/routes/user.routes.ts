import express, { type Response, type Request } from "express";
import {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
} from "../controllers/user.controller.ts";

const router = express.Router();

router
	.route("/")
	.get(getAllUsers)
	.post(createNewUser)
	.patch(updateUser)
	.delete(deleteUser);

export default router;
