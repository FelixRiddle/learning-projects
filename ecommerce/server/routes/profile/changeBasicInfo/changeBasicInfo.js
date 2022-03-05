const jwt = require("jsonwebtoken");

const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");
const { basicInfoValidation } = require("../../../validation");
const {
	validateUserPasswordEmailAsync,
} = require("../../../lib/user/validateUser");

// Change basic info
module.exports = changeBasicInfo = async (req, res) => {
	get_time();
	console.log(`/changeBasicInfo`);

	try {
		// Validate data
		const { error } = basicInfoValidation(req.body);
		if (error)
			return res.send({
				state: "danger",
				error: true,
				joiMessage: error.details[0].message,
			});

		const { _id } = req.body;
		let user = {};
		{
			const { date, iat, password, email } = req.body;
			const foundUser = await User.findOne({ _id });
			user = foundUser._doc;
			
			const resultMessage = await validateUserPasswordEmailAsync(user, {
				password,
				email,
			});
			if (resultMessage) return res.send(resultMessage);
		}

		// Find and update
		const query = { _id };
		const update = { ...user };
		const userUpdated = await User.findOneAndUpdate(query, update, {
			new: true, // For returning the document
		});
		const { password, ...newUser } = userUpdated._doc;

		const newToken = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET);
		return res.header("auth-token", newToken).status(200).send({
			token: newToken,
			error: false,
			state: "success",
			message: `User updated!`,
		});
	} catch (err) {
		console.error(err);
		return res.send({
			state: "danger",
			error: true,
			message: "Internal server error, please try again later.",
		});
	}
};
