const http = require('http');
const port = process.env.PORT;
const server = http.createServer();
server.listen(port);