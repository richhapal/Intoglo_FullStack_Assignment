const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/signup", validate(authValidation.register), authController.signup);

router.post("/signin", validate(authValidation.login), authController.signin);

module.exports = router;
