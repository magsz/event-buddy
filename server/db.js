import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
	user: "magsz",
	host: "localhost",
	database: "magsz",
	password: "NovaAkamaru",
	port: 5432,
});

export default pool;
