const router = require("express").Router();
const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: "localhost",
	database: "test",
	password: process.env.POSTGRES_PASSWORD,
	port: 5432,
});

// Get all users
router.get((req, res) => {
	pool.query(`SELECT * FROM users ORDER BY id ASC`, (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
});

// Get user by id
router.get(":id", (req, res) => {
	const id = parseInt(req.params.id);

	pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
});

// Post a new user
router.post((req, res) => {
	const { name, email } = req.body;
	pool.query(
		`INSERT INTO users (name, email) VALUES ($1, $2)`,
		[name, email],
		(err, results) => {
			if (err) throw err;
			res.status(201).send(`User added with ID: ${results.insertId}`);
		}
	);
});

// Update an existing user
router.put(":id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email } = req.body;

	pool.query(
		`UPDATE users SET name = $1, email = $2 WHERE id = $3`,
		[name, email, id],
		(err, results) => {
			if (err) throw err;
			res.status(200).send(`User modified with ID: ${id}`);
		}
	);
});

// Delete a user
router.delete(":id", (req, res) => {
	pool.query(`SELECT * FROM users ORDER BY id ASC`, (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
});

module.exports = router;
