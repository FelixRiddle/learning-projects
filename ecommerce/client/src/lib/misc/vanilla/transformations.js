/**Converts an array into an object
 *
 * @param {Array} array The array to convert
 * @returns {Object} The object result
 */
export const arrayToObject = (array) => {
	if (!array) return undefined;
	return Object.assign({}, array);
};

/**Converts an object into an array
 *
 * @param {Object} object Object to convert
 * @returns {Array} The array
 */
export const objectToArray = (object) => {
	if (!object) return undefined;
	return Object.keys(object).map((key) => object[key]);
};

export const objectExists = (object) => {
	if (!object) return undefined;
	return (
		object &&
		Object.keys(object).length >= 1 &&
		Object.getPrototypeOf(object) === Object.prototype
	);
};
