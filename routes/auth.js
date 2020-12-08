const express = require("express");
const router = express.Router();
const { createSignupValidator } = require("../validators/index")
const { signup, signin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.post("/signup", createSignupValidator, signup);
router.post("/signin", signin);

router.param("userId", userById);

module.exports = router;