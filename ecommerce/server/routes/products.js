const router = require("express").Router();
const verify = require("../verifyToken");

router.get("/products", verify, (req, res) => {
	try {
		
		res.json({});
	} catch (err) {
		
	}
});

module.exports = router;