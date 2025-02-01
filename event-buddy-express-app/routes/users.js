import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

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

		const user = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

/** Create a user */
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res.status(400).send("missing requiered fields");
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await pool.query(
			"INSERT INTO users (username, email, password)  VALUES ($1, $2, $3) RETURNING *",
			[username, email, hashedPassword]
		);

		res.status(200).json({
			message: "User Created",
			user: result.rows[0],
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
