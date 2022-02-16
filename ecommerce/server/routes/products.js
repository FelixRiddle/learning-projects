const fs = require("fs");
const multer = require("multer");
const router = require("express").Router();
const verify = require("../verifyToken");
const { v4 } = require("uuid");
const busboy = require("busboy");

const User = require("../models/User");
const Product = require("../models/Product");
const { createProductValidation } = require("../validation");
const { get_time } = require("../lib/debug_info");
const uuidv4 = v4;

const DIR = "./uploads";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		get_time();
		console.log("multer.diskStorage");
		console.log(`Req body:`, req.body);
		console.log(`Req files:`, req.files);
		console.log(`File:`, file);
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		console.log("multer.filename");
		console.log(`Req body:`, req.body);
		console.log(`Req files:`, req.files);
		console.log(`File:`, file);
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

// router.post("/uploadImages", upload.array("images", 15), (req, res) => {
// 	get_time();
// 	console.log("/createProduct");
// });

router.post("/createProduct", upload.array("images", 15), async (req, res) => {
	get_time();
	console.log("/createProduct");

	try {
		console.log(`Req body:`, req.body);
		if (req.body && req.body.price) console.log(`Price:`, req.body.price);
		console.log(`Files:`, req.files);
		console.log(`File:`, req.file); 
		
		console.log(`Name:`, req.body.name)

		const { _id, name, stock, price } = req.body;
		const { token, ...otherThanToken } = req.body;

		// console.log(`Request:`, req);
		// console.log(`Req headers:`, req.headers);
		// console.log(`Req data:`, req.data);
		// console.log(`Req body:`, otherThanToken);
		// console.log(`Trying busboy:`);
		// const bb = busboy({ headers: req.headers });

		const { error } = createProductValidation({ name, stock, price });
		if (error) {
			console.log(`Error:`, error.details[0].message);
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
			console.log(`Couldn't find the user!`);
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

			// TODO: Check if the name is unique in the user products.
			// If two users have the same product name, that's okay.
			const query = { ownerId: _id };
			const userProducts = await Product.find(query);
			console.log(`User products length:`, userProducts.length);
			if (userProducts.length >= 10) {
				return res.send({
					error: true,
					field: "",
					state: "danger",
					message:
						"You have reached the maximum amount of products," +
						"please upgrade your account if you want to post more products.",
				});
			}

			// console.log(`Headers:`, req.headers);
			// console.log(`Formdata entries:`, req.headers.formdata);
			// console.log(`Formdata getall:`, req.headers.formdata);
			// const bb = busboy({ headers: req.headers });
			// bb.on("file", (name, file, info) => {
			// 	const { filename, encoding, mimeType } = info;
			// 	console.log(
			// 		`File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
			// 		filename,
			// 		encoding,
			// 		mimeType
			// 	);
			// 	file
			// 		.on("data", (data) => {
			// 			console.log(`File [${name}] got ${data.length} bytes`);
			// 		})
			// 		.on("close", () => {
			// 			console.log(`File [${name}] done`);
			// 		});
			// });

			// Insert product
			// const product = new Product({ ownerId: _id, name, stock, price });
			// const savedProduct = await product.save();

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
