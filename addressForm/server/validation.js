const Joi = require("joi");
const max = 128;

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