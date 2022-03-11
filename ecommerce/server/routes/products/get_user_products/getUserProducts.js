const { get_time } = require("../../../lib/debug_info");
const Product = require("../../../models/Product");

exports.getUserProducts = async (req, res) => {
	console.log("/api/products/getUserProducts");
	get_time();

	try {
		const { _id } = req.body;

		const query = { ownerId: _id };
		const products = await Product.find(query);

		res.send({
			products,
		});
	} catch (err) {
		console.error(err);
	}
};
