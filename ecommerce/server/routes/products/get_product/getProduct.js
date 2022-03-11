const { get_time } = require("../../../lib/debug_info");
const {
	validationMessages,
} = require("../../../lib/validation/validationMessages");
const Product = require("../../../models/Product");

exports.getProduct = async (req, res) => {
	console.log(`/api/products/getProduct`);
	get_time();

	try {
		const { productId, userId } = req.body;

		const query = { _id: productId, ownerId: userId };
		const product = await Product.findOne(query);
		const id = product._id.toString();
		// console.log(`Product:`, product);
		// console.log(`Product id:`, id);
		// console.log(`Input id:`, productId);
		// console.log(`Comparison:`, id === productId);

		if (id !== productId)
			return res.send({
				debug: {
					...validationMessages.itemNotFound,
				},
			});

		return res.send({ product });
	} catch (err) {
		console.warn(err);
		return res.send({
			debug: {
				...validationMessages.internalServerError,
			},
		});
	}
};
