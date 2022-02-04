const router = require("express").Router();
const verify = require("../verifyToken");

const User = require("../models/User");
const validateCreateProduct = require("../validation");

router.get("/createProduct", verify, async (req, res) => {
	// For debugging
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
	console.log("/createProduct");

	try {
		const { token, _id, name, images, stock, price } = req.body;
		const { error } = await validateCreateProduct({ name, stock, price });
		if (error)
			return res.send({
				state: "danger",
				error: true,
				field: "",
				joiMessage: error.details[0].message,
			});

		if (!images)
			return res.send({
				state: "danger",
				error: true,
				field: "",
				message: "No images provided.",
			});

		const user = await User.findOne({ _id });
		if (!user) {
			return res.send({
				error: true,
				field: "",
				state: "danger",
				message:
					"User doesn't exist, try logging out and logging in again." +
					"\nIf the error persists please contact us.",
			});
		} else {
			return res.send({
				error: false,
				field: "",
				state: "success",
				message: "Product created.",
			});
		}
	} catch (err) {
		return res.send({
			state: "danger",
			error: true,
			message: "Internal server error.",
		});
	}
});

module.exports = router;
