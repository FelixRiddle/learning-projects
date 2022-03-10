exports.validationMessages = {
	emailExists: {
		error: true,
		field: "email",
		message: `Email already exists.`,
		state: "error",
	},
	emailVerified: {
		error: false,
		field: "",
		message: "Email verified!",
		state: "success",
	},
	internalServerError: {
		error: true,
		field: "email",
		message: "Internal server error",
		state: "error",
	},
	userCreated: {
		error: false,
		field: "",
		message: "User created, check email!",
		state: "success",
	},
	wrongLink: {
		error: true,
		field: "",
		message: "The account was already activated or the link is wrong.",
		state: "error",
	},
};
