/**This function is to be used after a post request to the backend
 * when joi returns its error message, it returns the key literal
 * so this code changes that for something more readable by a normal
 * person, example: firstName -> First name, postalCode -> Postal code
 * this function is intended to use when giving feedback to the user.
 * @param {Object} input The user input
 * @param {String} res Response of the request
 * @param {Array} placeholderValues Replacement for the key literals
 * @param {Callback} setError Callback for setting the message (optional)
 * @param {Object} error Object containing error information (optional)
 */
export const handleMessageValidation = (
	input,
	res,
	placeholderValues,
	setError,
	error
) => {
	const inputKeys = [];
	Object.entries(input).map((e) => inputKeys.push(`"${e[0]}"`));

	// Force a copy of the string
	let responseData = (" " + res.data).slice(1);
	for (let index in inputKeys) {
		if (responseData.match(inputKeys[index])) {
			if (setError)
				setError({
					...error,
					message: responseData.replace(
						inputKeys[index],
						placeholderValues[index]
					),
				});
			return responseData.replace(inputKeys[index], placeholderValues[index]);
		}
	}

	return undefined;
};

/**This function is to be used after a post request to the backend
 * when joi returns its error message, it returns the key literal
 * so this code changes that for something more readable by a normal
 * person, example: firstName -> First name, postalCode -> Postal code
 * this function is intended to use when giving feedback to the user.
 * @param {Object} input The user input(Create a new object with the
 * same amount of keys as the placeholder)
 * @param {String} res Response of the request
 * @param {Array} placeholderValues Replacement for the key literals
 * @param {Callback} setError Callback for setting the message (optional)
 * @param {Object} error Object containing error information (optional)
 */
export const handleMessageValidationv2 = (
	input,
	res,
	placeholderValues,
	setError,
	error
) => {
	let inputKeys = [];
	console.log(`Typeofs: ${typeof input}`);
	if (Array.isArray(input)) {
		console.log(`Input is array.`);
		inputKeys = [...input];
	} else {
		Object.entries(input).map((e) => inputKeys.push(`"${e[0]}"`));
	}
	console.log(`Input keys:`, inputKeys);

	//inputKeys.map((e, index) => console.log(inputKeys[index]));
	//placeholderValues = ["First name", "Last name", "Email", "Password"];

	// Force a copy of the string
	let responseData = (" " + res.data.joiMessage).slice(1);
	console.log(`Response data sliced: ${responseData}`);
	for (let index in inputKeys) {
		console.log(
			`Replacing: ${inputKeys[index]} for ${placeholderValues[index]}`
		);
		console.log(`Does it match?: ${responseData.match(inputKeys[index])}`);
		console.log(`Response data: ${responseData}`);
		if (responseData.match(inputKeys[index]) !== null) {
			if (setError)
				setError({
					...error,
					message: responseData.replace(
						inputKeys[index],
						placeholderValues[index]
					),
				});
			return responseData.replace(inputKeys[index], placeholderValues[index]);
		}
	}

	return undefined;
};
