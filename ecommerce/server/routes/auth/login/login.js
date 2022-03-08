const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../../models/User");
const { loginValidation } = require("../../../validation");
const { get_time } = require("../../../lib/debug_info");

exports.login = async (req, res) => {
	get_time();
	console.log("/api/users/login");

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
};
