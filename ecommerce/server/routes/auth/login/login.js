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
		if (error)
			return res.send({
				debug: {
					error: true,
					field: "",
					joiMessage: error.details[0].message,
					state: "error",
				},
			});

		// Get the user
		const user = await User.findOne({ email: data.email });

		// Use ambiguous messages to prevent hacking attemps
		const msg = "Email or password is wrong";
		if (!user)
			return res.send({
				debug: {
					error: true,
					field: "",
					message: msg,
					state: "error",
				},
			});

		// Check if the password is correct
		const validPass = await bcrypt.compare(data.password, user.password);
		if (!validPass)
			return res.send({
				debug: {
					error: true,
					field: "",
					message: msg,
					state: "error",
				},
			});

		// Create and assign a token
		// The variables on the left, are the ones that we don't want
		// to save on jwt
		const { password, __v, ...userData } = user._doc;
		const token = jwt.sign(userData, process.env.TOKEN_SECRET);
		return res.header("auth-token", token).send({
			debug: {
				error: false,
				field: "",
				message: "Successfully logged in, going to the home page...",
				state: "success",
			},
			token,
		});
	} catch (err) {
		console.log(err);
		return res.send({
			debug: {
				error: true,
				field: "email",
				message: "Internal error",
				state: "error",
			},
		});
	}
};
