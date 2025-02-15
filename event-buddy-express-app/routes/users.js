import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateToken } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

/** get all users */
router.get("/", async (req, res) => {
	try {
		const users = await pool.query("SELECT * FROM users");
		res.json(users.rows);
	} catch (err) {
		console.error(err.message);
	}
});

/** Get a user by id */
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		if (req.user.userId !== parseInt(id)) {
			return res.status(403).json({ message: "Access denied" });
		}

		const user = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

/** Refresh Token */
router.post("/token", (req, res) => {
	const refrestToken = req.body.token;
});

/** User Log In */

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing requred field" });
	}

	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (result.rows.length === 0) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const user = result.rows[0];
		const userId = result.rows[0].id;

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		//generate JWT token

		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.TOKEN_EXPIRATION }
		);

		res.json({ message: "Log in Succesful", token, userId });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: "Server error" });
	}
});

/** Create a user */
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({ error: "missing required fields" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await pool.query(
			"INSERT INTO users (username, email, password)  VALUES ($1, $2, $3) RETURNING *",
			[username, email, hashedPassword]
		);

		res.status(200).json({
			message: "User Created",
			user: {
				id: result.rows[0].id,
				username: result.rows[0].username,
				email: result.rows[0].email,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error");
	}
});

/** Update a user */
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const setClause = Object.keys(updates)
			.map((key, index) => `${key} = $${index + 1}`)
			.join(", ");

		const values = Object.values(updates);
		values.push(id);

		const result = await pool.query(
			`UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *;`,
			values
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Event not found." });
		}
		res.status(200).json({
			message: "Event updated succesfully",
			event: result.rows[0],
		});
	} catch (err) {
		console.error(err.message);
	}
});

/** Delete a user */
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
		id,
	]);
	res.status(200).json({
		message: "User succesfully delete",
		user: deleteUser.rows[0],
	});
});

export default router;
