const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const verify = require("../../verifyToken");
const changeAddress = require("./changeAddress/changeAddress");
const changeBasicInfo = require("./changeBasicInfo/changeBasicInfo");
const changePassword = require("./changePassword/changePassword");

router.post("/changeBasicInfo", verify, changeBasicInfo);
router.post("/changePassword", verify, changePassword);
router.post("/changeAddress", verify, changeAddress);

module.exports = router;
