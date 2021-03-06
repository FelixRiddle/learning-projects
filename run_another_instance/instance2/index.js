const {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
} = require("unique-names-generator");

module.exports = {
	get_random_name: () => {
		const randomName = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
		}); // big_red_donkey

		const shortName = uniqueNamesGenerator({
			dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
			length: 2,
		}); // big-donkey

		console.log(`Random name:`, randomName);
		console.log(`Short name:`, shortName);

		return randomName;
	},
};
