const router = require("express").Router();
const verify = require("../verifyToken");
const multer = require("multer");

const User = require("../models/User");
const validateCreateProduct = require("../validation");
const { get_time } = require("../lib/debug_info");
const store = multer({ dest: "/" });

router.post("/createProduct", verify, store, async (req, res) => {
	get_time();
	console.log("/createProduct");

	try {
		const { token, _id, name, images, stock, price } = await req.body;

		console.log(`Data:`);
		console.log(req.body);

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

		// Get the user
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
		console.error(err);
		return res.send({
			state: "danger",
			error: true,
			message: "Internal server error.",
		});
	}
});

module.exports = router;
