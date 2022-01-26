/**This function is to be used after a post request to the backend
 * when joi returns its error message, it returns the key literal
 * so this code changes that for something more readable by a normal
 * person, example: firstName -> First name, postalCode -> Postal code
 * this function is intended to use when giving feedback to the user.
 * @param {Object} input The user input
 * @param {String} res Response of the request
 * @param {Array} placeholderValues Replacement for the key literals
 * @param {Callback} setMessage Callback for setting the message
 */
const handleMessageValidation = (input, res, placeholderValues, setMessage) => {
	const inputKeys = [];
	Object.entries(input).map((e) => inputKeys.push(`"${e[0]}"`));

	inputKeys.map((e, index) => console.log(inputKeys[index]));
	//placeholderValues = ["First name", "Last name", "Email", "Password"];

	// Force a copy of the string
	let responseData = (" " + res.data).slice(1);
	for (let index in inputKeys) {
		if (responseData.match(inputKeys[index])) {
			/*
			console.log(
				`Current: ${inputKeys[index]}, ${
					placeholderValues[index]
				}, result: ${responseData.replace(
					inputKeys[index],
					placeholderValues[index]
				)}`
			);*/
			setMessage(
				responseData.replace(inputKeys[index], placeholderValues[index])
			);
			return responseData.replace(inputKeys[index], placeholderValues[index]);
		}
	}

	return undefined;
};

export default handleMessageValidation;
