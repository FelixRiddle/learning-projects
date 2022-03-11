const User = require("../../../models/User");
const { changePasswordValidation } = require("../../../validation");
const bcrypt = require("bcrypt");
const { get_time } = require("../../../lib/debug_info");
const { updateUserAsync } = require("../../../lib/user/updateUser");
const {
	validateUserAndPasswordAsync,
} = require("../../../lib/user/validateUser");
const {
	validationMessages,
} = require("../../../lib/validation/validationMessages");

// Change password
module.exports = changePassword = async (req, res) => {
	get_time();
	console.log("/changePassword");

	try {
		const { _id, ...data } = req.body;
		// console.log(`Req body:`, req.body);
		// console.log(`Id:`, _id);

		// Validate data
		const { error } = changePasswordValidation({
			password: data.password,
			newPassword: data.newPassword,
		});
		if (error)
			return res.send({
				debug: {
					state: "danger",
					error: true,
					joiMessage: error.details[0].message,
				},
			});

		let user = await User.findOne({ _id });
		// console.log(`User found:`);
		// console.log(user);

		// KSDrjioejroiasiorjsodjfasfdojs;fpdj
		const result = await validateUserAndPasswordAsync(user, req.body);

		// console.log(`Result:`, result);
		if (result) {
			// Passwords are not the same
			return res.send({ debug: { ...result } });
		}

		if (!result) {
			// Update password
			let newPassword = await bcrypt.hash(data.newPassword, 10);
			const query = { _id };
			const update = {
				password: newPassword,
				lastUpdated: Date.now(),
			};

			const newToken = await updateUserAsync(query, update);
			// console.log(`User updated?: ${newToken}`);
			if (newToken)
				return res.header("auth-token", newToken).send({
					token: newToken,
					debug: {
						...validationMessages.passwordUpdated,
					},
				});
		}

		return res.send({
			error: true,
			state: "danger",
			message: "The user couldn't be found.",
		});
	} catch (err) {
		console.error(err);
		res.send({ debug: { ...validationMessages.internalServerError } });
	}
};
