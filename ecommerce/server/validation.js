const Joi = require("joi");
const max = 128;

module.exports.registerValidation = registerValidation = (data) => {
	const schema = Joi.object({
		first_name: Joi.string().min(3).max(max).required(),
		last_name: Joi.string().min(3).max(max).required(),
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(8).max(max).required(),
		country: Joi.string().max(max),
		province: Joi.string().max(max),
		city: Joi.string().max(max),
		address: Joi.string().max(max),
		postal_code: Joi.string().max(32),
		age: Joi.date(),
	});

	return schema.validate(data);
};

module.exports.loginValidation = loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(8).max(128).required(),
	});

	return schema.validate(data, schema);
};
