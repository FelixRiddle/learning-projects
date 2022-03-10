export const arrayToObject = (array) => {
	const newObject = {};

	for (let i in array) {
		i = parseInt(i);
		newObject[i] = array[i];
	}

	return newObject;
};
