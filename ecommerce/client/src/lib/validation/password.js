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
		return false;
	}
	return true;
};

/**
 *
 * @param {*} password
 * @param {*} setStatusCB
 * @param {*} overwrite
 */
export const validatePasswordLength = (password, setStatusCB, overwrite) => {
	if (password.length < 8) {
		getAnyMessage({
			setCB: setStatusCB,
			options: { messageType: "shortPassword", overwrite },
		});
		return false;
	}
	return true;
};
