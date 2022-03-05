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

		const { _id } = req.body;
		{
			const { password, email } = req.body;
			const foundUser = await User.findOne({ _id });

			const resultMessage = await validateUserPasswordEmailAsync(foundUser, {
				password,
				email,
			});
			if (resultMessage) return res.send(resultMessage);
		}

		// Find and update
		const query = { _id };

		// Update
		const { firstName, lastName, email, age, phoneNumber } = req.body;
		const update = { firstName, lastName, email, age, phoneNumber };

		// Update the user
		const newToken = updateUserAsync(query, update);
		if (newToken)
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
