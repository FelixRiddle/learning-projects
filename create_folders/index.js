const fs = require("fs");
const { v4 } = require("uuid");

const uuidv4 = v4;
const folderName = "./public/test";

try {
	// Check if folder exists and create it synchronously.
	if (!fs.existsSync(folderName)) {
		fs.mkdirSync(folderName);
	}
} catch (err) {
	console.error(err);
}
