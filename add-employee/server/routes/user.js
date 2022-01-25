const router = require("express").Router();
const Pool = require("pg").Pool;
require("dotenv").config();
const PgPoolStyle = require("../lib/easySql");
const easySql = new PgPoolStyle();

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: "localhost",
	database: "test",
	password: process.env.POSTGRES_PASSWORD,
	port: 5432,
});

router.post(`/register`, (req, res) => {
	try {
		pool.query(
			easySql.insertIntoString(req.body, `users`),
			easySql.getAsArray(req.body),
			(err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				res.status(201).send(`User added with ID: ${results.insertId}`);
				console.log(`Users inserted successfully.`);
			}
		);
	} catch (err) {
		console.error(err);
	}
});

router.post(`/login`, (req, res) => {});

module.exports = router;
