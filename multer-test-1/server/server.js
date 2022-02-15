const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

const upload = multer({ dest: "./uploads/" });
const mongo = require("./db/database");

mongoose.Promise = global.Promise;
mongoose
	.connect(mongo.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(
		() => {
			console.log(`Database connected!`);
		},
		(err) => {
			console.error(err);
		}
	);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/public", express.static("public"));	
app.use("/uploads", express.static("uploads"));

app.use("/endpoint", require("./routes/file.route"));

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}!`);
});

app.use((req, res, next) => {
	setImmediate(() => {
		next(new Error("Error ocurred"));
	})
})