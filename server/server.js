import express from "express";
import pool from "./db.js";
import userRouter from "./routes/users.js";
import eventRouter from "./routes/events.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/events", eventRouter);

app.listen(process.env.PORT, () => {
	console.log("Server is running on localhost 8000");
});
