require("dotenv").config();
const http = require('http');
const port = process.env.S_PORT || 3000;
const app = require('./app');

const server = http.createServer(app);
server.listen(port);