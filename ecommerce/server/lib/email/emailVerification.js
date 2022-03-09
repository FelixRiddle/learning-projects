const nodemailer = require("nodemailer");
require("dotenv").config();

exports.verifyEmail = () => {
	// Send email for verification
	const transporter = nodemailer.createTransport({
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
};
