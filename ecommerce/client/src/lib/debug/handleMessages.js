/** Converts any message into my personal format for showing messages
 *
 * @param {Object} Main object which contains the following options:
 * @param {Object} input Input data
 * @param {Object} placeHolderValues Replace input names for this
 * values(MUST be in order)
 * @param {Object} debug The response object o res.data
 * @param {Function} setCB Callback for setting values
 * @param {Object} options Additional options
 * {
 *   messageType: The message type
 * }
 * @returns Message or undefined.
 */
export const getAnyMessage = ({
	input,
	placeHolderValues,
	debug,
	setCB,
	options,
}) => {
	// For normal messages or joi errors
	const enhancedMessage = enhanceMessage(input, placeHolderValues, debug);

	// Other kind of messages
	const normalMessage = getMessage(options && options.messageType);

	const result = enhancedMessage || normalMessage;
	result.messageCopy = result.message;
	// console.log(`Message:`, result);

	if (setCB) setCB(result);

	return result;
};

// Types of messages
const messages = {
	networkError: {
		error: true,
		field: "",
		message: "Network error, this usually means that the server is down.",
		state: "danger",
	},
	passwordsDontMatch: {
		state: "danger",
		message: "Passwords don't match",
		field: "password",
		error: true,
	},
};

/** Get a message depending on its type
 *
 * @param {Array} messageTypes An object with the message types
 */
const getMessage = (messageType) => {
	if (!messageType) return;
	const messageTypes = Object.keys(messages);

	for (let i in messageTypes) {
		i = parseInt(i);

		const type = messageTypes[i];
		if (type === messageType) {
			return messages[type];
		}
	}

	return undefined;
};

/** Fix joi error messages or enhances normal messages
 *
 * @param {*} input
 * @param {*} placeHolderValues
 * @param {*} debug
 * @returns
 */
const enhanceMessage = (input, placeHolderValues, debug) => {
	if (!debug || !debug.data || !debug.data.debug) return undefined;
	if (!input) return undefined;

	const debugObject = debug.data.debug;
	const message = debugObject.message || debugObject.joiMessage;

	const messageResult = messageAndFieldValidation(
		input,
		placeHolderValues,
		message
	);
	// console.log(`New message:`, messageResult.message);
	// console.log(`Debug object:`, debugObject);
	const newMessage =
		(typeof debugObject.message === "string" && debugObject.message) ||
		messageResult.message;

	const resultObject = {
		error: debugObject.error,
		field: debugObject.field || messageResult.field || "",
		message: newMessage,
		state: (debugObject.state === "error" && "danger") || debugObject.state,
	};

	return resultObject;
};

/** Sets network error message
 *
 * @param {Function} setStatus Callback
 */
// export const getNetworkErrorMessage = (setStatus) => {
// 	if (setStatus)
// 		setStatus((prevValues) => {
// 			return {
// 				...prevValues,
// 				error: true,
// 				field: "",
// 				message: "Network error, this usually means that the server is down.",
// 				state: "danger",
// 			};
// 		});
// 	else return console.warn("Warning no setStatus callback provided.");
// };

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
