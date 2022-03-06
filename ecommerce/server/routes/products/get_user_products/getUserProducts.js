const { get_time } = require("../../../lib/debug_info");
const Product = require("../../../models/Product");

exports.getUserProducts = async (req, res) => {
	get_time();
	console.log("/api/products/getUserProducts");

	try {
		const { _id } = req.body;

		const query = { _id };
		const products = await Product.find(query);

		console.log(`Products:`, products);
		res.send({
			products,
		});
	} catch (err) {
		console.error(err);
	}
};
