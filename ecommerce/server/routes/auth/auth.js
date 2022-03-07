const router = require("express").Router();

const { confirmEmail } = require("./confirm_email/confirmEmail");
const { login } = require("./login/login");
const { register } = require("./register/register");

router.post("/register", register);
router.get("/confirmEmail", confirmEmail)
router.post("/login", login);

module.exports = router;
