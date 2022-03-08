const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");

exports.confirmEmail = async (req, res) => {
	console.log(`/api/users/confirmEmail`);
	get_time();

	try {
		const { id } = req.body;

		const mongoDBDocument = await User.findOne({
			info: { confirmEmailToken: id },
		});
		if (!mongoDBDocument)
			return res.send({
				error: true,
				message: "The account was already activated or the link is wrong.",
			});
		const user = mongoDBDocument._doc;

		const update = {
			info: {
				...user.info,
				confirmedEmail: true,
				confirmEmailToken: "",
				expiricyDate: "",
			},
		};
		const result = await User.findByIdAndUpdate(user._id, update, {
			new: true,
		});
		// console.log(`New user:`, result);

		console.log(`Email verified`)
		return res.send({ message: "Success!" });
	} catch (err) {
		console.warn(err);
		return res.status(400).send(`Error: ${err}`);
	}
};
