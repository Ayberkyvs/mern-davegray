// @ts-nocheck
import User from "../models/user.model.ts";
import Note from "../models/note.model.ts";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

// @desc Get All Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.find().select("-password").lean(); //? lean() returns a plain JavaScript object, not a mongoose document;
	if (!users?.length) {
		return res.status(404).json({ message: "No users found" });
	}
	return res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req: Request, res: Response) => {
	const { username, password, roles } = req.body;

	// Confirm Data
	if (!username || !password || !Array.isArray(roles) || !roles.length) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Check for duplicate username
	const duplicate = await User.findOne({ username }).lean().exec();
	if (duplicate) {
		return res.status(409).json({ message: "Username already exists" });
	}

	// Hash Password
	const hashedPwd = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

	const userObject = {
		username,
		password: hashedPwd,
		roles,
	};

	// Create and store new user
	const user = await User.create(userObject);
	if (user) {
		res.status(201).json({ message: `User ${username} created successfully` });
	} else {
		res.status(400).json({ message: "User could not be created" });
	}
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const { id, username, roles, active, password } = req.body;

	if (
		!id ||
		!username ||
		!Array.isArray(roles) ||
		!roles.length ||
		typeof active !== "boolean"
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const user = await User.findById(id).exec();
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	// Check for duplicate
	const duplicate = await User.findOne({ username }).lean().exec();
	// Allow updates to the original user
	if (duplicate && duplicate?._id !== id) {
		return res.status(409).json({ message: "Username already exists" });
	}

	user.username = username;
	user.roles = roles;
	user.active = active;

	if (password) {
		// Hash Password
		user.password = await bcrypt.hash(password, 10);
	}

	const updatedUser = await user.save();
	res.json({ message: `${updatedUser.username} updated successfully` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: "User ID is required" });
	}
	const note = await Note.findOne({ user: id }).lean().exec();
	if (note) {
		return res
			.status(400)
			.json({ message: "User has notes. Please delete notes first" });
	}

	const user = await User.findById(id).exec();

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const result = await user.deleteOne();

	const reply = `Username ${result.username} with ID ${result._id} has been deleted successfully`;

	res.json({ message: reply });
});

export { getAllUsers, createNewUser, updateUser, deleteUser };
