const router = require("express").Router();
const verify = require("../verifyToken");

router.get("/products", verify, (req, res) => {
	try {
	} catch (err) {
		
	}
});

module.exports = router;