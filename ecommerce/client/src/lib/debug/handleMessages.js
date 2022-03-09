/** Converts any message into my personal format for showing messages
 *
 * @param {Object} input Input data
 * @param {Object} placeHolderValues Replace input names for this
 * values(MUST be in order)
 * @param {Object} debug The response object o res.data
 * @param {Function} setCB Callback for setting values
 * @returns Message or undefined.
 */
export const getAnyMessage = (input, placeHolderValues, debug, setCB) => {
	if (!debug) return undefined;
	if (!input) return undefined;

	const debugObject = debug.data.debug;
	const message = debugObject.message || debugObject.joiMessage;

	const newMessage = messageAndFieldValidation(
		input,
		placeHolderValues,
		message
	);
	// console.log(`New message:`, newMessage.message);
	// console.log(`Debug object:`, debugObject);

	const resultObject = {
		error: debugObject.error,
		field: debugObject.field || newMessage.field || "",
		message:
			(typeof debugObject.message === "string" && debugObject.message) ||
			newMessage.message,
		state: (debugObject.state === "error" && "danger") || debugObject.state,
	};
	// console.log(`Result object:`, resultObject);

	if (setCB) setCB(resultObject);

	return resultObject;
};

/** Sets network error message
 *
 * @param {Function} setStatus Callback
 */
export const getNetworkErrorMessage = (setStatus) => {
	if (setStatus)
		setStatus((prevValues) => {
			return {
				...prevValues,
				error: true,
				field: "",
				message: "Network error, this usually means that the server is down.",
				state: "danger",
			};
		});
	else return console.warn("Warning no setStatus callback provided.");
};

/** Convert JOI error messages into messages readable by the user
 *
 * @param {*} input
 * @param {*} placeHolderValues
 * @param {*} message
 * @returns
 */
const messageAndFieldValidation = (input, placeHolderValues, message) => {
	if (!message || typeof message !== "string")
		return { message: "Unexpected error" };

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
