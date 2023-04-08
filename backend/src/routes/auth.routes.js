const express = require("express");

const authJoiValidation = require("../middleware/validate.middleware");
const { authSignInSchema, authSignUpSchema } = require("../validation/auth.validation");
const { createNewUser, userLoginWithEmailAndPassword } = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", authJoiValidation(authSignUpSchema), createNewUser);
// (req, res) => {
//      res.json({ message: "User True" });
// };
router.post("/signin", authJoiValidation(authSignInSchema), userLoginWithEmailAndPassword);

module.exports = router;
