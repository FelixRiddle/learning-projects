const fs = require("fs");
const multer = require("multer");
const router = require("express").Router();
const { v4 } = require("uuid");

const User = require("../../models/User");
const Product = require("../../models/Product");
const { createProductValidation } = require("../../validation");
const { get_time } = require("../../lib/debug_info");
const { getAll } = require("./get_all/getAll");
const { getUserProducts } = require("./get_user_products/getUserProducts");
const uuidv4 = v4;

const DIR = "uploads";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		get_time();
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

// Delete files if there was an error
const deleteFilesSync = (files) => {
	console.log(`Deleting files...`);
	for (let i in files) {
		i = parseInt(i);
		const file = files[i];
		fs.rmSync(`${file.destination}/${file.filename}`);
	}
};

// Move files
const moveFilesSync = (files, moveTo) => {
	console.log(`Copying files...`);
	for (let i in files) {
		i = parseInt(i);
		const file = files[i];
		console.log(`File location:`, `${file.destination}/${file.filename}`);
		fs.copyFileSync(
			`${file.destination}/${file.filename}`,
			moveTo + `/${file.filename}`
		);
	}
};

router.post("/create", upload.array("images", 15), async (req, res) => {
	get_time();
	console.log("/api/products/create");

	try {
		const { _id, description, name, stock, price } = req.body;
		const files = req.files;

		console.log(`Body:`, req.body);
		// If there's at least one file continue
		if (!files[0]) {
			return res.send({
				state: "danger",
				error: true,
				field: "",
				message: "You have to upload at least 1 image.",
			});
		}

		const { error } = createProductValidation({
			description,
			name,
			stock,
			price,
			description,
		});
		console.log(`Description:`, description);
		if (error) {
			deleteFilesSync(files);
			console.log(`Full error:`, error);
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
			deleteFilesSync(files);
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
			// If two users have the same product name, that's okay.
			// But the same user
			const query = { ownerId: _id };
			const userProducts = await Product.find(query);
			for (let i in userProducts) {
				i = parseInt(i);
				const product = userProducts[i];
				if (product.name === name) {
					deleteFilesSync(files);
					// Send error
					return res.send({
						error: true,
						field: "name",
						state: "error",
						message: "A product with the same name already exists.",
					});
				}
			}

			// If the user has 10 or more products
			if (userProducts.length >= 10) {
				deleteFilesSync(files);
				return res.send({
					error: true,
					field: "",
					state: "danger",
					message:
						"You have reached the maximum amount of products," +
						"please upgrade your account if you want to post more products.",
				});
			}

			// Create the folder with the id as a name
			// Check if folder exists and create it synchronously.
			const folderName = `${DIR}/${_id}`;
			if (!fs.existsSync(folderName)) {
				fs.mkdirSync(folderName);
			}
			// Move the images to a folder with the name of the product
			const productPath = `${DIR}/${_id}/${name}`;
			if (!fs.existsSync(productPath)) {
				fs.mkdirSync(productPath);
			}
			moveFilesSync(files, productPath);
			deleteFilesSync(files);

			// Get image paths
			const imagePaths = [];
			for (let i in files) {
				i = parseInt(i);
				const file = files[i];
				imagePaths.push(`${productPath}/${file.filename}`);
			}

			// Insert product
			const product = new Product({
				ownerId: _id,
				description,
				images: imagePaths,
				name,
				stock,
				price,
			});
			const savedProduct = await product.save();

			return res.send({
				error: false,
				field: "",
				state: "success",
				message: "Product created.",
			});
		}
	} catch (err) {
		console.error(err);
		deleteFilesSync(req.files);
		return res.send({
			state: "danger",
			error: true,
			message: "Internal server error.",
		});
	}
});

router.get("/getAll", getAll);
router.get("/getUserProducts", getUserProducts);

module.exports = router;
