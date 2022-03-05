const bcrypt = require("bcrypt");
const User = require("../../models/User");

/** Validate user and password, and respond with messages respectively
 *
 * user: The user found in the database
 * password; The input password
 *
 * returns: A message object.
 */
exports.validateUserAndPasswordAsync = async (user, password) => {
	const result = {};

	if (!user) {
		result.message = {
			error: true,
			field: "",
			state: "danger",
			message:
				"User doesn't exist, try logging out and logging in again." +
				"\nIf the error persists please contact us.",
		};
	} else {
		console.log(`User password: ${user.password}`);
		console.log(`Input password: ${password}`);
		// Compare passwords
		const passResult = await bcrypt.compare(password, user.password);
		if (!passResult) {
			result.message = {
				error: true,
				field: "password",
				state: "danger",
				message: "The password is incorrect",
			};
		}
	}

	return result;
};

/** Validate user, password adn email, and respond with messages respectively
 *
 * Object(user): The user found in the database
 * Object(input): Input with the fields user or password.
 *
 * returns: A message object.
 */
exports.validateUserPasswordEmailAsync = async (user, input) => {
	const result = {};

	if (!user) {
		result.message = {
			error: true,
			field: "",
			state: "danger",
			message:
				"User doesn't exist, try logging out and logging in again." +
				"\nIf the error persists please contact us.",
		};

		return result.message;
	}

	// If the input email is different from the email in the database
	if (input.email != user.email) {
		// Check if the email exists
		const emailExists = await User.findOne({ email: input.email });
		if (emailExists) {
			result.message = {
				error: true,
				field: "email",
				state: "danger",
				message: `That email is already in use.`,
			};
		}
	}

	// Compare passwords
	const passResult = await bcrypt.compare(input.password, user.password);
	if (!passResult) {
		result.message = {
			error: true,
			field: "password",
			state: "danger",
			message: "The password is incorrect",
		};
	}

	return result.message;
};
