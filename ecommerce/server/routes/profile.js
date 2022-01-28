const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { basicInfoValidation } = require("../validation");
const verify = require("../verifyToken");

router.post("/changeBasicInfo", verify, async (req, res) => {
	const time = new Date().getTime();
	const currentDate = new Date(time);
	const { _id, date, iat, token, ...data } = req.body;
	console.log(`Date: ${currentDate.toString()}`);
	console.log(req.body);
	console.log("/changeBasicInfo");
	try {
		const { error } = basicInfoValidation(data);
		error && console.log(error);
		if (error)
			return res.send({
				state: "danger",
				joiMessage: error.details[0].message,
			});

		// Get the user
		{
			let user = await User.findOne({ _id });
			if (!user)
				return res.send({ state: "danger", message: "User doesn't exists." });

			// If the user wants to change the email
			if (data.email != user.email) {
				console.log(`Changing email`);
				const emailExists = await User.findOne({ email: data.email });
				if (emailExists)
					return res.send({
						state: "danger",
						message: `That email is already in use.`,
					});
			}
		}

		const query = { _id };
		const update = { ...data };
		const user = await User.findOneAndUpdate(query, update, {
			new: true, // For returning the document
		});
		console.log(`User updated!`);

		res.status(200).send({ user, state: "success", message: `User updated!` });
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
});

module.exports = router;
