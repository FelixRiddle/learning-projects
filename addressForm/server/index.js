const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const cors = require("cors");

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
	console.log(`Connected to MongoDB.`);
});

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/register");

	try {
		console.log("Body");
		console.log(req.body);
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		});
		await user.save();

		res.status(200).send("User created");
	} catch (err) {
		console.error(err);
	}
});

app.post("/login", async (req, res) => {
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/login");

	try {
		const data = { ...req.body };
		console.log(`Body:`);
		console.log(data);
		console.log(typeof data);
		if (req.body.email) {
			const query = { email: req.body.email };
			const user = await User.findOne(query);
			console.log(`User`);
			console.log({ ...user._doc });

			const token = jwt.sign({ ...user._doc }, process.env.TOKEN_SECRET);
			return res
				.header("auth-token", token)
				.status(200)
				.send({ token, message: "Successfully logged in." });
		} else {
			return res
				.status(400)
				.send({ message: "You didn't even provide an email!" });
		}
	} catch (err) {
		console.error(err);
		return res.status(400).send({ message: "Internal server error." });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
