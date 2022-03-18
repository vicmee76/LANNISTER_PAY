require("dotenv").config();
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.S_PORT || 3000;
const feesRoute = require("./api/routes/fees_route");
const computeTransactionRoute = require("./api/routes/compute_transaction_fees_route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/fees', feesRoute);
app.use('/api/compute-transaction-fee', computeTransactionRoute);



app.listen(port, () => {
    console.log('Running on port ' + port);
})