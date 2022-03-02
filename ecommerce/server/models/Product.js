const mongoose = require("mongoose");

const product = new mongoose.Schema({
	// To prevent spammers, only allow the user to upload
	// up to X messages for each product.
	comments: {
		type: Array,
	},
	ownerId: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		max: 5010,
	},
	name: {
		type: String,
		required: true,
		min: 3,
		max: 128,
	},
	images: {
		type: Array,
		min: 1,
		max: 100,
	},
	stock: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: true,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", product);
