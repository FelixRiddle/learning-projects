const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
	basicInfoValidation,
	changePasswordValidation,
} = require("../validation");
const verify = require("../verifyToken");

router.post("/changeBasicInfo", verify, async (req, res) => {
	/*
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/changeBasicInfo");*/
	try {
		// Validate data
		const { error } = basicInfoValidation(req.body);
		if (error)
			return res.send({
				state: "danger",
				error: true,
				joiMessage: error.details[0].message,
			});

		const { _id, date, iat, token, password, ...data } = req.body;
		let user = await User.findOne({ _id });

		console.log(`User document:`);
		console.log(user);
		if (!user) {
			return res.send({ state: "danger", message: "User doesn't exists." });
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
					state: "danger",
					field: "email",
					error: true,
					message: `That email is already in use.`,
				});
			}
		}

		// Find and update
		const query = { _id };
		const update = { ...data };
		user = await User.findOneAndUpdate(query, update, {
			new: true, // For returning the document
		});
		console.log(`User updated!`);

		const newToken = jwt.sign(req.body, process.env.TOKEN_SECRET);
		return res.header("auth-token", newToken).status(200).send({
			token: newToken,
			user,
			error: false,
			state: "success",
			message: `User updated!`,
		});
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
});

router.post("/changePassword", verify, async (req, res) => {
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/changePassword");

	try {
		const { _id, repeatNewPassword, token, ...data } = req.body;

		// Validate data
		const { error } = changePasswordValidation(data);
		console.log(`Joi error:`);
		console.log(error);
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
				let newUser = await User.findOneAndUpdate(query, update, { new: true });

				const newToken = jwt.sign({ ...newUser._doc }, process.env.TOKEN_SECRET);
				return res.header("auth-token", newToken).status(200).send({
					token: newToken,
					user,
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

module.exports = router;
