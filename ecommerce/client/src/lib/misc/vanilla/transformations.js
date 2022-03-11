/**Converts an array into an object
 *
 * @param {Array} array The array to convert
 * @returns {Object} The object result
 */
export const arrayToObject = (array) => {
	return Object.assign({}, array);
};

/**Converts an object into an array
 * 
 * @param {Object} object Object to convert 
 * @returns {Array} The array
 */
export const objectToArray = (object) => {
	return Object.keys(object).map((key) => object[key]);
};
