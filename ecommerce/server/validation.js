const Joi = require("joi");
const max = 128;

module.exports.registerValidation = registerValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(max).required(),
		lastName: Joi.string().min(3).max(max).required(),
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(8).max(max).required(),
		country: Joi.string().max(max).allow(null, ""),
		province: Joi.string().max(max).allow(null, ""),
		city: Joi.string().max(max).allow(null, ""),
		address: Joi.string().max(max).allow(null, ""),
		postalCode: Joi.string().max(32).allow(null, ""),
		age: Joi.date(),
	});

	return schema.validate(data);
};

module.exports.loginValidation = loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(8).max(max).required(),
	});
	return schema.validate(data);
};

module.exports.basicInfoValidation = basicInfoValidation = (data) => {
	const {
		firstName,
		lastName,
		email,
		password,
		phoneNumber,
		country,
		province,
		city,
		address,
		postalCode,
		age,
	} = data;
	const userFields = {
		firstName,
		lastName,
		email,
		password,
		phoneNumber,
		country,
		province,
		city,
		address,
		postalCode,
		age,
	};

	const schema = Joi.object({
		firstName: Joi.string().min(3).max(max).required(),
		lastName: Joi.string().min(3).max(max).required(),
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(8).max(max).required(),
		phoneNumber: Joi.string().min(3).max(max),
		country: Joi.string().max(max),
		province: Joi.string().max(max),
		city: Joi.string().max(max),
		address: Joi.string().max(max),
		postalCode: Joi.string().max(32),
		age: Joi.date(),
	});

	return schema.validate(userFields);
};

module.exports.changePasswordValidation = changePasswordValidation = (data) => {
	const schema = Joi.object({
		currentPassword: Joi.string().min(8).max(max).required(),
		newPassword: Joi.string().min(8).max(max).required(),
	});

	return schema.validate(data);
};

module.exports.changeAddressValidation = changeAddressValidation = (data) => {
	const schema = Joi.object({
		country: Joi.string().max(max).allow(null, ""),
		province: Joi.string().max(max).allow(null, ""),
		city: Joi.string().max(max).allow(null, ""),
		address: Joi.string().max(max).allow(null, ""),
		postalCode: Joi.string().max(32).allow(null, ""),
	});

	return schema.validate(data);
};

/** Validate product data
 */
module.exports.createProductValidation = createProductValidation = (data) => {
	const schema = Joi.object({
		description: Joi.string().max(5000),
		name: Joi.string().max(max).required(),
		stock: Joi.number().required(),
		price: Joi.number().required(),
	});

	return schema.validate(data);
};
