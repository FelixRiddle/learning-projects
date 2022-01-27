const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { basicInfoValidation } = require("../validation");
const verify = require("../verifyToken");

router.post("/changeBasicInfo", verify, async (req, res) => {
	const time = new Date().getTime();
	const date = new Date(time);
	console.log(`Date: ${date.toString()}`);
	console.log(req.body);
	try {
		const { error } = basicInfoValidation(req.body);
		error && console.log(error);
		if (error) return res.send(error.details[0].message);

		// Check if the user is already in the database
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) return res.send(`That email is already in use.`);

		const user = new User({ ...req.body });

		const savedUser = await user.save();
		console.log(`User created!`);
		res.status(200).send(savedUser);
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
});

module.exports = router;
