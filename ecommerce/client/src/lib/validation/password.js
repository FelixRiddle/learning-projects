import { getAnyMessage } from "../debug/handleMessages";

/** Sets the status message by the callback
 *
 * @param {String} password Password
 * @param {String} confirmPassword Confirm password
 * @param {Function} setStatusCB Set callback
 * @returns {Boolean} Returns false if the passwords don't match, true if passwords match
 */
export const confirmPasswordValidation = (
	password,
	confirmPassword,
	setStatusCB
) => {
	if (confirmPassword !== password) {
		getAnyMessage({
			setCB: setStatusCB,
			options: { messageType: "passwordsDontMatch" },
		});
		// setStatusCB((prevValues) => {
		// 	return {
		// 		...prevValues,
		// 		state: "danger",
		// 		message: "Passwords don't match",
		// 		field: "password",
		// 		error: true,
		// 	};
		// });
		return false;
	}
	return true;
};
