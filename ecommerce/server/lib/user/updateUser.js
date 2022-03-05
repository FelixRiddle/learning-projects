const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.updateUserAsync = async (query, update) => {
	const userUpdated = {};

	// Make query
	try {
		userUpdated.value = await User.findOneAndUpdate(query, update, {
			new: true, // For returning the document
		});
	} catch (err) {
		console.warn(`User not found.`);
	}

	// If the user couldn't be updated
	if (userUpdated.value === null) return null;
	const { password, ...newUser } = userUpdated.value._doc;

	// Sign the updated user
	const newToken = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET);

	return newToken;
};
