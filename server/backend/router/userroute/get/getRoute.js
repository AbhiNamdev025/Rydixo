const express = require("express");
const router = express.Router();
const getController = require("../../../controller/user/get/getController");

router.get("/find", getController.getUser);

module.exports = router;
