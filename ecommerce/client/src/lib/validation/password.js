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
	setStatusCB,
	options
) => {
	if (confirmPassword !== password) {
		getAnyMessage({
			setCB: setStatusCB,
			options: { messageType: "passwordsDontMatch", ...options },
		});
		return false;
	}
	return true;
};

/** Check if password length is less than 8
 *
 * @param {String} password The password
 * @param {Function} setStatusCB Set state
 * @param {Object} overwrite Overwrites the field, like confirmPassword
 */
export const validatePasswordLength = (password, setStatusCB, overwrite) => {
	// console.log(`Overwrite:`, overwrite);
	if (password.length < 8) {
		getAnyMessage({
			setCB: setStatusCB,
			options: { messageType: "shortPassword", overwrite },
		});
		return false;
	}
	return true;
};
