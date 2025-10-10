const express = require("express");
const router = express.Router();
const postController = require("../../../controller/user/post/postController");

router.post("/add", postController.postUser);

module.exports = router;
