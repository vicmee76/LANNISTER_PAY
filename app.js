require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.S_PORT || 3000;


app.get('/', (req, res) => {
    res.send("Welcome");
});

app.listen(port, () => {
    console.log('Running on port ' + port);
})