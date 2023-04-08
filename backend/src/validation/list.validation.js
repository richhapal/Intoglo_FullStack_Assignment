const Joi = require("joi").extend(require("@joi/date"));

const listSchema = Joi.object().keys({
     name: Joi.string().required(),
     amount: Joi.number().positive().max(3000),
     assignTo: Joi.string().required().valid("admin", "manager"),
     status: Joi.string().default("Pending"),
     date: Joi.date().format("YYYY-MM-DD"),
     email: Joi.string().email().required(),
     comment: Joi.string(),
});
const updateSchema = Joi.object().keys({
     listId: Joi.string().required(),
     status: Joi.string().required(),
     comment: Joi.string().required(),
});

module.exports = { listSchema, updateSchema };
