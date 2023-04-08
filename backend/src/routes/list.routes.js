const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth.middleware");
const authJoiValidation = require("../middleware/validate.middleware");
const { listSchema, updateSchema } = require("../validation/list.validation");
const { createNewList, getList, updateList } = require("../controller/list.controller");

// add new list for user
router.post("/add", verifyAuth, authJoiValidation(listSchema), createNewList);

// get User List
router.post("/:userType", verifyAuth, getList);

// updateList for list
router.patch("/update", verifyAuth, authJoiValidation(updateSchema), updateList);

module.exports = router;
