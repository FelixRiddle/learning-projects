const { get_time } = require("../../../lib/debug_info");
const User = require("../../../models/User");
const {
	validationMessages,
} = require("../../../lib/validation/validationMessages");

exports.confirmEmail = async (req, res) => {
	console.log(`/api/users/confirmEmail`);
	get_time();

	try {
		const { id } = req.body;

		const mongoDBDocument = await User.findOne({
			info: { confirmEmailToken: id },
		});
		if (!mongoDBDocument)
			return res.send({ debug: { ...validationMessages.wrongLink } });
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

		console.log(`Email verified`);
		return res.send({ debug: { ...validationMessages.emailVerified } });
	} catch (err) {
		console.warn(err);
		return res.send({
			debug: { ...validationMessages.internalServerError },
		});
	}
};
