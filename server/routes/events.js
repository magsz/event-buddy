import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

//routes

/**Get all events Public access*/
router.get("/", async (req, res) => {
	try {
		const events = await pool.query("SELECT * FROM events ORDER BY id");
		res.json(events.rows);
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

/** Get events via query parameter */

router.get("/search", async (req, res) => {
	const searchQuery = req.query.search;

	try {
		const events = await pool.query(
			`SELECT * FROM events WHERE title LIKE $1 OR description LIKE $1 OR location LIKE $1 OR genre LIKE $1`,
			[`%${searchQuery}%`]
		);
		res.json(events.rows);
	} catch (err) {
		res.status(400).json({
			message: "Cannot process request",
			error: err.message,
		});
	}
});

/**Get events by event Id */
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const event = await pool.query("SELECT * FROM events WHERE id = $1", [
			id,
		]);
		res.json(event.rows[0]);
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});
/**Create an event */
router.post("/", authenticateToken, async (req, res) => {
	let { title, description, startDate, endDate, location, genre } = req.body;

	if (
		!title ||
		!description ||
		!startDate ||
		!endDate ||
		!location ||
		!genre
	) {
		return res.status(400).send("missing requiered fields");
	}

	try {
		const result = await pool.query(
			"INSERT INTO events (title, description, startdate,enddate,location,genre)  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[title, description, startDate, endDate, location, genre]
		);

		res.status(200).json({
			message: "Event Created",
			user: result.rows[0],
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

/** Update an event */
router.put("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;

		const updates = req.body;

		const setClause = Object.keys(updates)
			.map((key, index) => `${key} = $${index + 1}`)
			.join(", ");

		const values = Object.values(updates);
		values.push(id);

		const result = await pool.query(
			`UPDATE events SET ${setClause} WHERE id = $${values.length} RETURNING *;`,
			values
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Event not found." });
		}
		res.status(200).json({
			message: "Event updated succesfully",
			event: result.rows[0],
		});
		// const update = await pool.query
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

/** Delete an event */

router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;

		const deleteEvent = await pool.query(
			"DELETE FROM events WHERE id = $1",
			[id]
		);

		res.status(200).json({ message: "Event succesfully deleted." });
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

/** RSVP to an event */

router.post("/:id/rsvp", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, status } = req.body;

		const result = await pool.query(
			`INSERT INTO rsvps (user_id, event_id, status) 
        VALUES ($1,$2,$3) 
        ON CONFLICT (user_id, event_id) 
        DO UPDATE SET status = EXCLUDED.status 
        RETURNing *;`,
			[user_id, id, status]
		);

		res.status(200).json({
			message: "RSVP RECORDED",
			rsvp: result.rows[0],
		});
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

/** Remove RSVP from event */

router.delete("/:id/rsvp", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id } = req.body;

		const result = await pool.query(
			`DELETE FROM rsvps WHERE user_id = $1 AND event_id = $2 RETURNING *;`,
			[user_id, id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "RSVP not found" });
		}

		res.status(200).json({ message: "RSVP removed" });
	} catch (err) {
		console.error(err.message);
		return res
			.status(500)
			.json({ message: "Database error", details: err.message });
	}
});

router.get("/:id/rsvps", async (req, res) => {
	const query = "SELECT * FROM rsvps";

	const result = await pool.query(query);

	if (result.rows.length === 0) {
		res.status(404).json({ message: "error" });
	}

	res.status(200).json({ message: "Success", rsvp: result.rows });
});
export default router;
