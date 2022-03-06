const { get_time } = require("../../../lib/debug_info");
const Product = require("../../../models/Product");

exports.getUserProducts = async (req, res) => {
	get_time();
	console.log("/api/products/getUserProducts");

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
