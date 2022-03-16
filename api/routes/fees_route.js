const express = require('express');
const feesController = require("../controllers/fees_controller");
const _router = express.Router();

_router.post("/", feesController._postFeesController);

module.exports = _router;