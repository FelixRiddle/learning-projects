const { get_time } = require("../../../lib/debug_info");
const Product = require("../../../models/Product");

exports.getAll = async (req, res) => {
	console.log("/api/products/getAll");
	get_time();

	try {
		const products = await Product.find();
		// console.log(`Products:`, products);
		return res.send(products);
	} catch (err) {
		// console.error(err);
		return res.send({
			state: "danger",
			error: true,
			field: "",
			message: "Internal server error please try again later.",
		});
	}
}
