const http = require('http')
const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 3001;

const app = require('./app');

const server = http.createServer(app);



server.listen(PORT);