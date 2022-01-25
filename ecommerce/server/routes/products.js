const router = require("express").Router();
const verify = require("../verifyToken");

router.get("/products", verify, (req, res) => {
	res.json({
		
	})
})

module.exports = router;