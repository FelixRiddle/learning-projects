export const resizeByPercentage = (resizeImagePercentage, viewportSize, cb) => {
	// Validation
	if (
		!resizeImagePercentage ||
		!resizeImagePercentage.width ||
		!resizeImagePercentage.height
	) {
		console.log(
			`Error: On lib/resizer/resizeByPercentage: First argument, ` +
				`\n'resizeImagePercentage' was not given, or is bad formatted.`
		);
		return;
	}
	if (!viewportSize || !viewportSize.width || !viewportSize.height) {
		console.log(
			`Error: On lib/resizer/resizeByPercentage: First argument, ` +
				`\n'resizeImagePercentage' was not given, or is bad formatted.`
		);
		return;
	}

	// Get the new width and height, by dividing the percentage and multiplying it
	// by width.
	const newWidth = (resizeImagePercentage.width / 100) * viewportSize.width;
	const newHeight = (resizeImagePercentage.height / 100) * viewportSize.height;

	return cb(newWidth, newHeight);
};
