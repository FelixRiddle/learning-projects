const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "./uploads/" });

app.use(express.json());
app.use(cors());

app.post("/images", upload.array("images", 5), (req, res, next) => {
	// req.files is array of `images` files
	// req.body will contain the text fields, if there were any
	console.log(`Files:`, req.files, `\nBody:`, req.body);
});

const cpUpload = upload.fields([
	{ name: "avatar", maxCount: 1 },
	{ name: "gallery", maxCount: 8 },
]);
app.post("/cool-profile", cpUpload, function (req, res, next) {
	// req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
	//
	// e.g.
	//  req.files['avatar'][0] -> File
	//  req.files['gallery'] -> Array
	//
	// req.body will contain the text fields, if there were any
});

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}!`);
});
