const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const { changeAddressValidation } = require("./validation");
const verify = require("./verifyToken");

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

app.post("/changeAddress", verify, async (req, res) => {
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/login");
	console.log(`Body`);
	console.log(req.body);

	try {
		const { token, _id } = req.body;
		const data = {
			country: req.body.country,
			province: req.body.province,
			city: req.body.city,
			postalCode: req.body.postalCode,
			address: req.body.address,
		};
		
		// Validate data
		const { error } = changeAddressValidation(data);

		console.log(`Body:`);
		console.log({ ...data });
		console.log(error);
		if (error)
			return res.send({
				state: "danger",
				error: true,
				joiMessage: error.details[0].message,
			});
		// If no token was provided
		if (!token) {
			return res.send({
				error: true,
				field: "token",
				state: "danger",
				message: "Session terminated, please logout and login again.",
			});
		}

		// If the user provided at least 1 field with information
		if (
			data.country ||
			data.province ||
			data.city ||
			data.postalCode ||
			data.address
		) {
			// If for some reason there is no _id field
			if (!_id)
				return res.send({
					state: "danger",
					message:
						"Sorry there was an internal error, try to logout and login again.",
				});

			// Update the user
			const query = { _id };
			const update = {
				country: data.country,
				province: data.province,
				city: data.city,
				postalCode: data.postalCode,
				address: data.address,
			};
			const newUser = User.findOneAndUpdate(query, update, { new: true });
			console.log(`New user:`);
			console.log({...newUser._doc});
			return res.send({ state: "success", message: "Information updated." });
		} else {
			return res.send({
				state: "danger",
				error: true,
				message: "No data provided.",
			});
		}
	} catch (err) {
		console.error(err);
		res.send({
			state: "danger",
			message: "Internal server error.",
			error: "true",
			err,
		});
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
