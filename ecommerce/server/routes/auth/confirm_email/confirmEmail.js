const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");

exports.confirmEmail = (req, res) => {
	console.log(`/api/users/confirmEmail`);
	get_time();

	try {
		const { id } = req.body;

		const user = User.findOne({ info: { id } });
	} catch (err) {
		console.warn(err);
	}
};
