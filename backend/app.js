const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./src/routes/index.routes");
// const { errorHandler } = require("./middlewares/error");
// const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./src/helper/passport");
const helmet = require("helmet");
const passport = require("passport");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// gzip compression
app.use(compression());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// enable prefilghts
app.options("*", cors());

passport.use("jwt", jwtStrategy);

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
     res.status(httpStatus.NOT_FOUND).json({ message: "Path Not Found" });
});

// handle error
// app.use(errorHandler);

module.exports = app;
