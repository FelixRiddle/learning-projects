const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		min: 5,
	},
	password: {
		type: String,
		required: true,
		max: 128,
		min: 8,
	},
	country: {
		type: String,
		max: 128,
	},
	province: {
		type: String,
		max: 128,
	},
	city: {
		type: String,
		max: 128,
	},
	address: {
		type: String,
		max: 128,
	},
	postalCode: {
		type: String,
		max: 32,
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

// Here "User" is the collection
module.exports = mongoose.model("User", userSchema);
