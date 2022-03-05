const User = require("../../../models/User");
const { changePasswordValidation } = require("../../../validation");
const bcrypt = require("bcrypt");
const { get_time } = require("../../../lib/debug_info");

// Change password
module.exports = changePassword = async (req, res) => {
	get_time();
	console.log("/changePassword");

	try {
		const { _id, repeatNewPassword, ...data } = req.body;
		console.log(`Req body:`, req.body);
		console.log(`Id:`, _id);

		// Validate data
		const { error } = changePasswordValidation(data);
		if (error)
			return res.send({
				state: "danger",
				error: true,
				joiMessage: error.details[0].message,
			});

		let user = await User.findOne({ _id });
		console.log(`User found:`);
		console.log(user);

		// KSDrjioejroiasiorjsodjfasfdojs;fpdj
		if (data.currentPassword !== undefined && user) {
			const result = await bcrypt.compare(data.currentPassword, user.password);
			console.log(`Comparison result: ${result}`);
			if (!result) {
				// Passwords are not the same
				return res.send({
					error: true,
					state: "danger",
					message: "The current password is not correct.",
					field: "currentPassword",
					name: "Current password",
				});
			}
			if (result) {
				// Update password
				let newPassword = await bcrypt.hash(data.newPassword, 10);
				const query = { _id };
				const update = {
					password: newPassword,
					lastUpdated: Date.now(),
				};

				const userUpdated = await User.findOneAndUpdate(query, update, {
					new: true,
				});
				const { password, ...newUser } = userUpdated._doc;

				const newToken = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET);
				return res.header("auth-token", newToken).status(200).send({
					token: newToken,
					error: false,
					state: "success",
					message: "Password updated successfully.",
				});
			}
		}

		return res.send({
			error: true,
			state: "danger",
			message: "The user coulnd't be found.",
		});
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
};
