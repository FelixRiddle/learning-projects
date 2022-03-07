const bcrypt = require("bcrypt");

const User = require("../../../models/User");
const { registerValidation } = require("../../../validation");
const { get_time } = require("../../../lib/debug_info");

exports.register = async (req, res) => {
	get_time();
	console.log(`/api/users/register`);

	try {
		const { error } = registerValidation(req.body);
		if (error) return res.send(error.details[0].message);

		// Check if the user is already in the database
		const email = req.body.email.toLowerCase();
		const emailExist = await User.findOne({ email });
		if (emailExist) return res.send(`Email already exists.`);

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const confirmEmailToken = await bcrypt.hash("a", 10);
		console.log(`Confirm email token:`, confirmEmailToken);
		const user = new User({
			email,
			password: hashedPassword,
			info: {
				confirmEmailToken,
			},
		});
		const savedUser = await user.save();

		// Send email for verification
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
		});
		
		const info = await transporter.sendMail({})

		console.log(`User created!`);
		return res.status(200).send(savedUser);
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};
