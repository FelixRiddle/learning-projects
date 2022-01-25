const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const mongoURI = process.env.MONGODB_URI;
mongoose
	.connect(mongoURI, { useNewUrlParser: true }, () => {
		console.log(`Connected to MongoDB.`);
	});

app.use(express.json());
app.use(cors());

app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/auth"));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
