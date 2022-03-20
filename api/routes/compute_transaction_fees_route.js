const express = require('express');
const feesController = require("../controllers/fees_controller");
const _router = express.Router();

_router.post("/", feesController._computeTransactionFees);

module.exports = _router;