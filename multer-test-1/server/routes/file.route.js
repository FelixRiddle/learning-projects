let express = require("express");
let mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
let multer = require("multer");
let router = express.Router();

const DIR = "./uploads/";
let File = require("../models/File");

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

// router.post("/multi-images-upload", (req, res) => {
// 	console.log(`New post request, files:`, req.files)
// })

router.post(
	"/multi-images-upload",
	upload.array("imagesArray", 8),
	(req, res, next) => {
		const reqFiles = [];
		console.log(`Filed:`, req.files);

		console.log(`req.protocol: ${req.protocol}`);
		console.log(`req.get("host"): ${req.get("host")}`);
		const url = req.protocol + "://" + req.get("host");
		console.log(`url: ${url}`);

		for (let i in reqFiles) {
			i = parseInt(i);

			reqFiles.push(url + "/uploads/" + req.files[i].filename);
		}

		const user = new File({
			_id: new mongoose.Types.ObjectId(),
			imagesArray: reqFiles,
		});

		// Save user
		user
			.save()
			.then((result) => {
				return res.status(201).json({
					message: "Uploaded!",
					uesrCreated: {
						_id: result._id,
						imagesArray: result.imagesArray,
					},
				});
			})
			.catch((err) => {
				console.error(err);

				return res.status(500).json({
					error: err,
				});
			});
	}
);

router.get("/", (req, res, next) => {
	File.find().then((response) => {
		return res.status(200).json({
			message: "Images fetched!",
			posts: response,
		});
	});
});

module.exports = router;
