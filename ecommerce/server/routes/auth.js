const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
	try {
		const { error } = registerValidation(req.body);
		error && console.log(error);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if the user is already in the database
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) return res.status(400).send(`Email already exists.`);

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const user = new User({ ...req.body, password: hashPassword });

		const savedUser = await user.save();
		console.log(`User created!`);
		res.status(200).send(savedUser);
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { error } = loginValidation(req.body);
		error && console.log(error);
		if (error) return res.status(400).send(error.details[0].message);

		// Get the user
		const user = await User.findOne({ email: req.body.email });

		// Use ambiguous messages to prevent hacking attemps
		const msg = "Email or password is wrong.";
		if (!user) return res.status(400).send(msg);

		// Check if the password is correct
		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) return res.status(400).send(msg);

		// Create and assign a token
		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
		res.header("auth-token", token).status(200).send(token);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;