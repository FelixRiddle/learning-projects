const get_time = () => {
	// For debugging
	const time = new Date().getTime();
	const currentDate = new Date(time);
	console.log(`Date: ${currentDate.toString()}`);
};

module.exports = { get_time };
