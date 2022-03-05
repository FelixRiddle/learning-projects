const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");
const { changeAddressValidation } = require("../../../validation");

// For the change address part
module.exports = changeAddress = async (req, res) => {
	get_time();
	console.log("/changeAddress");

	try {
		const { _id } = req.body;
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
		if (
			data.country ||
			data.province ||
			data.city ||
			data.postalCode ||
			data.address
		) {
			// If for some reason there is no _id field
			if (!_id)
				return res.send({
					state: "danger",
					message:
						"Sorry there was an internal error, try to logout and login again.",
				});

			const foundUser = await User.findOne({ _id });
			console.log(foundUser);

			// Update the user
			const query = { _id };
			const update = {
				country: data.country,
				province: data.province,
				city: data.city,
				postalCode: data.postalCode,
				address: data.address,
			};
			const userUpdated = await User.findOneAndUpdate(query, update, {
				new: true,
			});
			const { password, ...newUser } = userUpdated._doc;
			console.log(`New user`);
			console.log({ ...newUser });

			const newToken = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET);

			return res.status(200).send({
				token: newToken,
				error: false,
				state: "success",
				message: "Information updated.",
			});
		} else {
			return res.send({
				state: "danger",
				error: true,
				message: "No data provided.",
			});
		}
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
