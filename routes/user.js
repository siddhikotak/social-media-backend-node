const express = require("express");
const router = express.Router();
const { userById, allUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth")


router.get("/users", allUsers);
router.get("/users/:userId", requireSignIn, getUser);
router.put("/users/:userId", requireSignIn, updateUser);
router.delete("/users/:userId", requireSignIn, deleteUser);


router.param("userId", userById);

module.exports = router;