const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4 } = require("uuid");
const uuidv4 = v4;

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

		const confirmEmailToken = uuidv4() + uuidv4() + uuidv4();
		console.log(`Confirm email token:`, confirmEmailToken);
		const user = new User({
			email,
			password: hashedPassword,
			info: {
				confirmEmailToken,
			},
		});

		// Send email for verification
		const transporter = await nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.GOOGLE_GMAIL_ADDRESS,
				pass: process.env.GOOGLE_ACCESS_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"Ecommerce email verification" <${process.env.GOOGLE_GMAIL_ADDRESS}>`,
			to: email,
			subject: "Email verification",
			html: `<b>Verify email</b>
			<p>Click the link below to verify your email:</p>
			<a href="${process.env.CLIENT_URL}confirmEmail/${confirmEmailToken}" >
			Confirm email</a>`,
		});

		// Save at the end
		const savedUser = await user.save();
		console.log(`User ${email} saved`);
		// console.log(`Info:`, info);

		return res.status(200).send(savedUser);
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};
