const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
	basicInfoValidation,
	changePasswordValidation,
	changeAddressValidation,
} = require("../validation");
const verify = require("../verifyToken");
const { get_time } = require("../lib/debug_info");

router.post("/changeBasicInfo", verify, async (req, res) => {
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

		let user = {};
		{
			const { _id, date, iat, password } = req.body;
			user = { ...(await User.findOne({ _id })) };
		}
		const data = req.body;

		console.log(`User document:`);
		console.log(user);
		if (!user) {
			return res.send({
				error: true,
				field: "",
				state: "danger",
				message:
					"User doesn't exist, try logging out and logging in again." +
					"\nIf the error persists please contact us.",
			});
		} else {
			// Compare passwords
			const result = await bcrypt.compare(password, user.password);
			if (!result) {
				return res.send({
					error: true,
					field: "password",
					state: "danger",
					message: "The password is incorrect",
				});
			}
		}

		// If the user wants to change the email
		if (data.email != user.email) {
			const emailExists = await User.findOne({ email: data.email });
			if (emailExists) {
				return res.send({
					error: true,
					field: "email",
					state: "danger",
					message: `That email is already in use.`,
				});
			}
		}

		// Find and update
		const query = { _id };
		const update = { ...data };
		const userUpdated = await User.findOneAndUpdate(query, update, {
			new: true, // For returning the document
		});
		const { password, ...newUser } = userUpdated._doc;

		console.log(`User updated!`);
		console.log(newUser);

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
});

router.post("/changePassword", verify, async (req, res) => {
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
});

// For the change address part
router.post("/changeAddress", verify, async (req, res) => {
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
});

module.exports = router;
