import { messages } from "./notificationMessages";

/** Converts any message into my personal format for showing messages
 *
 * @param {Object} Main object which contains the following options:
 * @param {Object} input Input data
 * @param {Object} placeholderValues Replace input names for this
 * values(MUST be in order)
 * @param {Object} debug The response object o res.data
 * @param {Function} setCB Callback for setting values
 * @param {Object} options Additional options
 * {
 *   messageType: The message type,
 * 	 // Overwrites a field at the end,
 *   overwrite: { field: New value, message: New value, ... },
 *   // Keys for reorganizing the object keys useful in situations
 *   // where the key positions are important.
 *   // (Obviously, it MUST be in order)
 *   reorganizedKeys: ["First name", "Last name", ...],
 * }
 * @returns Message or undefined.
 */
export const getAnyMessage = ({
	input,
	placeholderValues,
	debug,
	setCB,
	options,
}) => {
	// console.log(` --- getAnyMessage ---`);
	// console.log(`Input:`, input);
	// console.log(`Debug:`, debug);
	// console.log(`Placeholder values:`, placeholderValues);

	// For normal messages or joi errors
	const enhancedMessage = enhanceMessage(
		input,
		placeholderValues,
		debug,
		options
	);

	// Other kind of messages
	const normalMessage = getMessage(options && options.messageType);

	let result = enhancedMessage || normalMessage;

	// console.log(`Enhanced message:`, enhancedMessage);
	// console.log(`Normal message:`, normalMessage);
	// console.log(`Result:`, result);

	if (!result)
		return console.warn("Something went wrong in getAnyMessage function");

	// Overwrite a field at the end
	// Because the ids and input keys password and confirmPassword
	// are different
	// console.log(`Options:`, options);
	// console.log(`Overwrite:`, options.overwrite);
	if (options && options.overwrite) {
		result = {
			...result,
			...options.overwrite,
		};
	}

	result.messageCopy = result.message;
	result.fieldCopy = result.field;

	if (setCB) setCB(result);

	return result;
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
			// console.log(`Message:`, messages[type]);
			return messages[type];
		}
	}

	return undefined;
};

/** Fix joi error messages or enhances normal messages
 *
 * @param {*} input
 * @param {*} placeholderValues
 * @param {*} debug
 * @returns
 */
const enhanceMessage = (input, placeholderValues, debug, options) => {
	if (!debug || !debug.data || !debug.data.debug) return undefined;

	const debugObject = debug.data.debug;
	const message = debugObject.message || debugObject.joiMessage;

	const messageResult = messageAndFieldValidation(
		input,
		placeholderValues,
		message,
		options
	);

	// console.log(`Debug object:`, debugObject);
	// console.log(`Debug message:`, messageResult);
	const newMessage =
		(debugObject &&
			typeof debugObject.message === "string" &&
			debugObject.message) ||
		(messageResult && messageResult.message) ||
		"Unexpected error";

	const resultObject = {
		error: debugObject.error,
		field:
			(debugObject && debugObject.field) ||
			(messageResult && messageResult.field) ||
			"",
		message: newMessage,
		state: (debugObject.state === "error" && "danger") || debugObject.state,
	};

	return resultObject;
};

/** Convert JOI error messages into messages readable by the user
 *
 * @param {*} input
 * @param {*} placeholderValues
 * @param {*} message
 * @returns
 */
const messageAndFieldValidation = (
	input,
	placeholderValues,
	message,
	options
) => {
	if (!message || typeof message !== "string")
		return { message: "Unexpected error" };

	// console.log(`Options:`, options);
	if (input || (options && options.reorganizedKeys)) {
		const inputKeys =
			(options && options.reorganizedKeys) || Object.keys(input);

		// console.log(`--- messageAndFieldValidation --- `);
		// console.log(`Input:`, input);
		// console.log(`Input keys:`, inputKeys);
		// console.log(`Message:`, message);
		// console.log(`Its type: ${typeof message}`);

		for (let i in inputKeys) {
			i = parseInt(i);
			const template = `"${inputKeys[i]}"`;
			const match = message.match(template);

			// console.log(`Template:`, template);
			// console.log(`Its replace value:`, placeholderValues[i]);
			// console.log(`Match:`, match);

			if (match) {
				return {
					field: inputKeys[i],
					message: message.replace(template, placeholderValues[i]),
				};
			}
		}
	} else {
		return {
			message,
		};
	}
};

// const messageValidation = (input, placeholderValues, message) => {
// 	const inputKeys = Object.keys(input);

// 	for (let i in inputKeys) {
// 		i = parseInt(i);
// 		const template = `"${inputKeys[i]}"`;
// 		const match = message.match(template);
// 		if (match) {
// 			return message.replace(template, placeholderValues[i]);
// 		}
// 	}
// };
