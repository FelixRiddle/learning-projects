const { get_time } = require("../../../lib/debug_info");
const { updateUserAsync } = require("../../../lib/user/updateUser");
const {
	validateDataExists,
	validateUserAndPasswordAsync,
} = require("../../../lib/user/validateUser");
const User = require("../../../models/User");
const { changeAddressValidation } = require("../../../validation");

// For the change address part
module.exports = changeAddress = async (req, res) => {
	get_time();
	console.log("/changeAddress");

	try {
		const { _id, password } = req.body;
		console.log(`Id:`, _id);
		const data = {
			country: req.body.country,
			province: req.body.province,
			city: req.body.city,
			postalCode: req.body.postalCode,
			address: req.body.address,
		};

		// Validate data
		const { error } = changeAddressValidation(data);
		if (error) {
			return res.send({
				state: "danger",
				error: true,
				joiMessage: error.details[0].message,
			});
		}

		// If the user provided at least 1 field with information
		const validationResult = validateDataExists(data);
		if (validationResult.error) return res.send(validationResult);

		// If for some reason there is no _id field
		if (!_id)
			return res.send({
				state: "danger",
				message:
					"Sorry there was an internal error, try to logout and login again.",
			});

		const foundUser = await User.findOne({ _id });
		console.log(foundUser);

		const userValidation = await validateUserAndPasswordAsync(foundUser, {
			password,
		});
		if (userValidation) return res.send(userValidation);

		// Update the user
		const query = { _id };
		const update = {
			country: data.country,
			province: data.province,
			city: data.city,
			postalCode: data.postalCode,
			address: data.address,
		};

		const newToken = await updateUserAsync(query, update);
		if (newToken)
			return res.status(200).send({
				token: newToken,
				error: false,
				state: "success",
				message: "Address updated.",
			});
		return res.status(400).send({
			error: true,
			state: "danger",
			message:
				"Unspecified error or user not found, try logging out and log in again.",
		});
	} catch (err) {
		console.error(err);
		res.send({
			state: "danger",
			message: "Internal server error.",
			error: "true",
			err,
		});
	}
};
