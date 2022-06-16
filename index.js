require('dotenv').config();

const Server = require('./app/models/Server.model');

const server = new Server();

server.listen();
