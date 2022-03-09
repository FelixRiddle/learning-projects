/** Converts any message into my personal format for showing messages
 *
 * @param {Object} input Input data
 * @param {Object} debug The response object o res.data
 * @returns Message or undefined.
 */
export const getAnyMessage = (input, placeHolderValues, debug) => {
	if (!debug) return undefined;
	if (!input) return undefined;

	const debugObject = debug.data.debug;
	const message = debugObject.message || debugObject.joiMessage;

	const newMessage = messageAndFieldValidation(
		input,
		placeHolderValues,
		message
	);
	console.log(`New message:`, newMessage);
	console.log(`Debug object:`, debugObject);

	const resultObject = {
		error: debugObject.error,
		field: newMessage.field,
		message: newMessage.message,
		state: (debugObject.state === "error" && "danger") || debugObject.state,
	};
	console.log(`Result object:`, resultObject);

	return resultObject;
};

const messageAndFieldValidation = (input, placeHolderValues, message) => {
	const inputKeys = Object.keys(input);

	for (let i in inputKeys) {
		i = parseInt(i);
		const template = `"${inputKeys[i]}"`;
		const match = message.match(template);
		if (match) {
			return {
				field: inputKeys[i],
				message: message.replace(template, placeHolderValues[i]),
			};
		}
	}
};

// const messageValidation = (input, placeHolderValues, message) => {
// 	const inputKeys = Object.keys(input);

// 	for (let i in inputKeys) {
// 		i = parseInt(i);
// 		const template = `"${inputKeys[i]}"`;
// 		const match = message.match(template);
// 		if (match) {
// 			return message.replace(template, placeHolderValues[i]);
// 		}
// 	}
// };
