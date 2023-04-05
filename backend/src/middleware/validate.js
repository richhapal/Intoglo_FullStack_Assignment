const Joi = require("joi");
const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

/**
 *  Middleware function that validates user requests against a Joi schema
 *
 */
const validate = (schema) => (req, res, next) => {
     // Request body should be JSON, if present
     //  if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
     //       return next(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Supports JSON request body only"));
     //  }
};

module.exports = validate;
