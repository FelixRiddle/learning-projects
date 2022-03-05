const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");
const { basicInfoValidation } = require("../../../validation");
const {
	validateUserPasswordEmailAsync,
} = require("../../../lib/user/validateUser");
const { updateUserAsync } = require("../../../lib/user/updateUser");

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

		const { _id, firstName, lastName, email, age, password, phoneNumber } =
			req.body;
		const foundUser = await User.findOne({ _id });

		const resultMessage = await validateUserPasswordEmailAsync(foundUser, {
			password,
			email,
		});
		if (resultMessage) return res.send(resultMessage);

		// Find and update
		const query = { _id };

		// Update
		const update = {
			firstName,
			lastName,
			lastUpdated: Date.now(),
			email,
			age,
			phoneNumber,
		};

		// Update the user
		const newToken = await updateUserAsync(query, update);
		if (newToken)
			return res.header("auth-token", newToken).status(200).send({
				token: newToken,
				error: false,
				state: "success",
				message: `User updated!`,
			});

		return res.status(400).send({
			error: true,
			state: "error",
			message:
				"Unspecified error or user not found, try logging out and login again.",
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
