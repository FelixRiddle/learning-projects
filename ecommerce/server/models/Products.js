const mongoose = require("mongoose");

const product = new mongoose.Schema({
	product_name: {
		type: String,
		required: true,
		min: 3,
		max: 128,
	},
	product_images: {
		type: Array,
		required: true,
		min: 1,
		max: 10,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", product);
