const http = require('http')

const PORT = process.env.PORT || 3001;

const app = require('./app');

const server = http.createServer(app);

httpProxy.createProxyServer({
    target: 'https://mernblograjath.herokuapp.com',
    toProxy: true,
    changeOrigin: true,
    xfwd: true
});


server.listen(PORT);