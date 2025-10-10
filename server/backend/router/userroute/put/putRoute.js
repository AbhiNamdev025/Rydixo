const express = require("express");
const router = express.Router();
const updateController = require("../../../controller/user/put/putController");

router.put("/update/:id", updateController.updateUser);

module.exports = router;
