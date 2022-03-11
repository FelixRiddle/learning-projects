exports.validationMessages = {
	emailExists: {
		error: true,
		field: "email",
		message: `Email already in use by someone else`,
		state: "error",
	},
	emailVerified: {
		error: false,
		field: "",
		message: "Email verified!",
		state: "success",
	},
	incorrectPassword: {
		error: true,
		field: "password",
		message: "The password is incorrect",
		state: "danger",
	},
	internalServerError: {
		error: true,
		field: "",
		message: "Internal server error",
		state: "error",
	},
	passwordUpdated: {
		error: false,
		message: "Password updated successfully.",
		state: "success",
	},
	unspecifiedError: {
		error: true,
		field: "",
		message:
			"Unspecified error or user not found, try logging out and login again",
		state: "error",
	},
	userCreated: {
		error: false,
		field: "",
		message: "User created, check email!",
		state: "success",
	},
	userDoesntExist: {
		error: true,
		field: "",
		message:
			"User doesn't exist, try logging out and log in again." +
			"\nIf the error persists please contact us.",
		state: "danger",
	},
	wrongLink: {
		error: true,
		field: "",
		message: "The account was already activated or the link is wrong.",
		state: "error",
	},
};
