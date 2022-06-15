require('dotenv').config();

const Server = require('./app/models');

const server = new Server();

server.listen();
