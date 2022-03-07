const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	address: {
		type: String,
		max: 128,
	},
	age: {
		type: Date,
		default: Date.now,
	},
	city: {
		type: String,
		max: 128,
	},
	country: {
		type: String,
		max: 128,
	},
	// Register date
	date: {
		default: Date.now,
		lowercase: true,
		type: Date,
	},
	email: {
		type: String,
		required: true,
		min: 5,
	},
	firstName: {
		type: String,
		min: 1,
		max: 128,
	},
	info: {
		type: Object,
		default: {
			confirmedEmail: false,
			confirmEmailToken: "",
		},
	},
	lastName: {
		type: String,
		min: 1,
		max: 128,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	password: {
		type: String,
		required: true,
		max: 128,
		min: 8,
	},
	phoneNumber: {
		type: String,
		max: 128,
		min: 4,
	},
	postalCode: {
		type: String,
		max: 32,
	},
	// Store owned products id
	products: {
		type: Array,
	},
	province: {
		type: String,
		max: 128,
	},
});

// Here "User" is the collection
module.exports = mongoose.model("User", userSchema);
