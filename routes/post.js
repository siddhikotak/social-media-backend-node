const express = require("express");
const router = express.Router();
const { createPostValidator } = require("../validators/index")
const { createPost, getPosts, postByUsers, postById, isPoster, deletePost, updatePost } = require("../controllers/post");
const { requireSignIn } = require("../controllers/auth")
const { userById } = require("../controllers/user")


router.get("/posts", getPosts);
router.get("/userpost", postByUsers);
router.post("/post/new/:userId", requireSignIn, createPost, createPostValidator);
router.get("/posts/by/:userId", postByUsers);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.param("userId", userById);
router.param("postId", postById);

module.exports = router;