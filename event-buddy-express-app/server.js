import express from "express";
import pool from "./db.js";
import userRouter from "./routes/users.js";
import eventRouter from "./routes/events.js";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/events", eventRouter);

app.get("/test", (req, res) => {
	console.log("hi");
	res.status(200).send("all good bro");
});

app.get("/", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users;");
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({
			message: "Failed to connect to the database",
			error: error.message,
		});
	}
});

app.listen(8000, () => {
	console.log("Server is running on localhost 8000");
});
