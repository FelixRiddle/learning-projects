const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
	try {
		const { error } = registerValidation(req.body);
		if (error) return res.send(error.details[0].message);

		// Check if the user is already in the database
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) return res.send(`Email already exists.`);

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const user = new User({ ...req.body, password: hashPassword });
		const savedUser = await user.save();
		console.log(`User created!`);
		return res.status(200).send(savedUser);
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	// For debugging
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/login");
	
	const data = req.body;
	try {
		const { error } = loginValidation(data);
		if (error) return res.send(error.details[0].message);

		// Get the user
		const user = await User.findOne({ email: data.email });

		// Use ambiguous messages to prevent hacking attemps
		const msg = "Email or password is wrong.";
		if (!user) return res.send(msg);

		// Check if the password is correct
		const validPass = await bcrypt.compare(data.password, user.password);
		if (!validPass) return res.send(msg);

		// Create and assign a token
		// The variables on the left, are the ones that we don't want
		// to save on jwt
		const { password, __v, ...userData } = user._doc;
		const token = jwt.sign(userData, process.env.TOKEN_SECRET);
		return res
			.header("auth-token", token)
			.status(200)
			.send({ token, message: "Successfully logged in." });
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
});

module.exports = router;
