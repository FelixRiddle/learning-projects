const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { validationMessages } = require("../validation/validationMessages");

/** Validate user and password, and respond with messages respectively
 *
 * user: The user found in the database
 * password; The input password
 *
 * returns: A message object.
 */
exports.validateUserAndPasswordAsync = async (user, input) => {
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
	}

	// Compare passwords
	const passResult = await bcrypt.compare(input.password, user.password);
	if (!passResult) {
		result.message = {
			error: true,
			field: "password",
			state: "danger",
			message: "The password is incorrect",
			name: "Current password",
		};
	}

	return result.message;
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
			debug: {
				...validationMessages.userDoesntExist,
			},
		};

		return result.message;
	}

	// If the input email is different from the email in the database
	if (input.email != user.email) {
		// Check if the email exists
		const emailExists = await User.findOne({ email: input.email });
		if (emailExists) {
			result.message = {
				debug: {
					...validationMessages.emailExists,
				},
			};
		}
	}

	// Compare passwords
	const passResult = await bcrypt.compare(input.password, user.password);
	if (!passResult) {
		result.message = {
			debug: {
				...validationMessages.incorrectPassword,
			},
		};
	}

	return result.message;
};

/** Check if at least one field exists
 *
 * @param {*} fields
 * @returns
 */
exports.validateDataExists = (fields) => {
	for (let key of Object.keys(fields)) {
		if (fields[key]) return { error: false };
	}

	return {
		state: "danger",
		error: true,
		message: "No data provided.",
	};
};
