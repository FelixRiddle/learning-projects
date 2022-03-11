const router = require("express").Router();
const { v4 } = require("uuid");
const uuidv4 = v4;
const multer = require("multer");

const { get_time } = require("../../lib/debug_info");
const { getAll } = require("./get_all/getAll");
const { getUserProducts } = require("./get_user_products/getUserProducts");
const { create } = require("./create/create");
const { getProduct } = require("./get_product/getProduct");

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

router.post("/create", upload.array("images", 15), create);
router.get("/getAll", getAll);
router.post("/getProduct", getProduct);
router.post("/getUserProducts", getUserProducts);

module.exports = router;
