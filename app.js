require("dotenv").config();
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const feesRoute = require("./api/routes/fees_route");
const computeTransactionRoute = require("./api/routes/compute_transaction_fees_route");

mongoose.connect('mongodb+srv://lannister:' + process.env.DB_PASS + '@lannister-pay-db.ei0fl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/fees', feesRoute);
app.use('/api/compute-transaction-fee', computeTransactionRoute);

module.exports = app;