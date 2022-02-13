/**
 * 
 * @param {*} parentElement 
 * @param {*} callback 
 * @returns A callback with every child element as a parameter
 */
export const change_child_elements = (parentElement, callback) => {
	// If span element exists
	if (parentElement) {
		// console.log(`Every children`);
		// console.log(spanElement.children);
		const elements = parentElement.children;
		const indexes = Object.entries(elements);
		// console.log(`Object entries`);
		// console.log(indexes);

		// Traverse keys and elements, but we are only going to use
		// the keys.
		for (let i in indexes) {
			// i is a string, so we convert it to a number
			i = parseInt(i);

			// .children collection, returns weird things, so we filter only
			// the elements that we need, for that we check if the key of
			// the element can be of type number.
			if (typeof parseInt(indexes[i][0]) === "number") {
				return callback(elements[i], i);
			}
		}
	} else {
		return "No parent element provided.";
	}
};
