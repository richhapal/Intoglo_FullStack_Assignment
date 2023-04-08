const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const listRoutes = require("./list.routes");

router.use("/auth", authRoutes);
router.use("/list", listRoutes);

module.exports = router;
