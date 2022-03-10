// Types of messages
export const messages = {
	alreadyLoggedIn: {
		error: false,
		field: "",
		message: "You are already logged in",
		state: "warn",
	},
	// loginSuccess: {
	// 	error: false,
	// 	field: "",
	// 	message: "Successfully logged in, going to the home page...",
	// 	state: "success",
	// },
	networkError: {
		error: true,
		field: "",
		message: "Network error, this usually means that the server is down",
		state: "danger",
	},
	passwordsDontMatch: {
		error: true,
		field: "password",
		message: "Passwords don't match",
		state: "danger",
	},
	shortPassword: {
		error: false,
		field: "password",
		message: "The password must be at least 8 characters long",
		state: "warn", // warn || warning
	},
};
