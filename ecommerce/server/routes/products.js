const fs = require("fs");
const multer = require("multer");
const router = require("express").Router();
const verify = require("../verifyToken");

const User = require("../models/User");
const { createProductValidation } = require("../validation");
const { get_time } = require("../lib/debug_info");

const DIR = "./uploads";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().replaceAll(" ", "-");
		cb(null, uuidv4() + "-" + fileName);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(
				new Error(
					"File type not accepted (.png, .jpg, .jpeg are the accepted types)"
				)
			);
		}
	},
});

router.post("/uploadImages", upload.array("images", 15), (req, res) => {
	get_time();
	console.log("/createProduct");
});

router.post("/createProduct", verify, async (req, res) => {
	get_time();
	console.log("/createProduct");

	try {
		const { token, _id, name, stock, price } = await req.body;

		// console.log(`Data:`);
		// console.log(req.body);

		const { error } = createProductValidation({ name, stock, price });
		if (error) {
			return res.send({
				state: "danger",
				error: true,
				field: "",
				joiMessage: error.details[0].message,
			});
		}

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
			// Create the folder with the id as a name
			// Check if folder exists and create it synchronously.
			const folderName = `${DIR}/${_id}`;
			if (!fs.existsSync(folderName)) {
				fs.mkdirSync(folderName);
			}

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
