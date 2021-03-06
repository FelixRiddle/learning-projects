// Types of messages
export const messages = {
	alreadyLoggedIn: {
		error: false,
		field: "",
		message: "You are already logged in",
		state: "warn",
	},
	loading: {
		error: false,
		field: "",
		message: "Loading...",
		state: "wait", // wait || waiting
	},
	networkError: {
		error: true,
		field: "",
		message: "Network error, this usually means that the server is down",
		state: "danger",
	},
	notLoggedIn: {
		error: true,
		field: "",
		message: "You are not logged in",
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
	somethingWentWrong: {
		error: true,
		field: "",
		message: "Something went wrong, if the error persists, try " +
		"logging out and log in again",
		state: "danger",
	},
};
