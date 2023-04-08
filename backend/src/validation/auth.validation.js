const Joi = require("joi");

const authSignInSchema = Joi.object().keys({
     email: Joi.string().required(),
     password: Joi.string().required().min(8),
});

const authSignUpSchema = Joi.object().keys({
     name: Joi.string().required().min(5).max(25),
     email: Joi.string().email().required(),
     password: Joi.string().required().min(8),
     userType: Joi.string().required().valid("user", "admin", "manager"),
});

module.exports = { authSignUpSchema, authSignInSchema };
