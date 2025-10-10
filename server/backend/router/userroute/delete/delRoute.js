const express = require("express");
const router = express.Router();
const deleteController = require("../../../controller/user/delete/delContoller");

router.delete("/del/:id", deleteController.deleteUser);

module.exports = router;
