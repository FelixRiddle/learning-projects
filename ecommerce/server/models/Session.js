const mongoose = require("mongoose");

const product = new mongoose.Schema({
	sessionID: {
		type: String,
		required: true,
	},
	computers: {
		type: Array,
		default: [],
		required: true,
		/*
		Do something like this
		[{
			BrowserID: string
			ComputerID: string
			FingerprintID: string
			userID: string
			authToken: string
			ipAddresses: ["203.525....", "203.525...", ...]
			// Computer session data goes here
		}, ...]
		*/
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model("Product", product);
