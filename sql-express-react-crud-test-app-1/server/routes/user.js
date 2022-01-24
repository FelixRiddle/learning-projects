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

router.post(`/register`, (req, res) => {
	const { first_name, age, country, position, wage_year } = req.body;
	
	try {
	pool.query(
		`INSERT INTO users (first_name, age, country, position, wage_year) VALUES ($1, $2, $3, $4, $5)`,
		//[name, email, country, position, wage],//
		[first_name, age, country, position, wage_year],
		(err, results) => {
		  if (err) {
				console.log(err);
				return;
			};
			res.status(201).send(`User added with ID: ${results.insertId}`);
			console.log(`Users inserted successfully.`)
		}
	);
	} catch(err) {
		console.error(err);
	}
});

router.post(`/login`, (req, res) => {});

module.exports = router;
