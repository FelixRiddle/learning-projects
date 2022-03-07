const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
	console.log(`Connected to MongoDB.`);
});

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
	return res.status(200).send({ status: "success", msg: "Server online" });
});
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/api/products", require("./routes/products/products"));
app.use("/api/users", require("./routes/auth/auth"));
app.use("/api/profile", require("./routes/profile/profile"));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
