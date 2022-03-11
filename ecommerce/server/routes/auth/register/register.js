const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const uuidv4 = v4;

const User = require("../../../models/User");
const { registerValidation } = require("../../../validation");
const { get_time } = require("../../../lib/debug_info");
const {
	validationMessages,
} = require("../../../lib/validation/validationMessages");
const { sendVerificationEmailGoogleSMTP } = require("../../../lib/email/email");

exports.register = async (req, res) => {
	console.log(`/api/users/register`);
	get_time();

	try {
		const { error } = registerValidation(req.body);
		if (error)
			return res.send({
				debug: {
					error: true,
					joiMessage: error.details[0].message,
					state: "error",
				},
			});

		// Check if the user is already in the database
		const email = req.body.email.toLowerCase();
		const emailExist = await User.findOne({ email });
		if (emailExist)
			return res.send({
				debug: {
					error: true,
					field: "email",
					message: `Email already exists.`,
					state: "error",
				},
			});

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const confirmEmailToken = uuidv4() + uuidv4() + uuidv4();
		// console.log(`Confirm email token:`, confirmEmailToken);

		const info = await sendVerificationEmailGoogleSMTP(
			email,
			confirmEmailToken
		);

		const user = new User({
			email,
			password: hashedPassword,
			info: {
				confirmEmailToken,
			},
		});

		// Save at the end
		const savedUser = await user.save();
		// console.log(`User ${email} saved`);
		console.log(`Info:`, info);

		return res.send({
			debug: { ...validationMessages.userCreated },
			user: savedUser,
		});
	} catch (err) {
		console.error(err);
		return res.send({ debug: { ...validationMessages.internalServerError } });
	}
};
