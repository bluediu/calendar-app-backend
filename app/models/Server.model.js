const express = require('express');
const cors = require('cors');

/* Database */
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      events: '/api/events',
      users: '/api/users',
    };

    // Connect to db
    this.connectToDB();

    // Middlewares
    this.middlewares();

    // my app routes
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // read and parse the body
    this.app.use(express.json());

    // public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(
      this.paths.events,
      require('../routes/events.routes')
    );

    this.app.use(
      this.paths.users,
      require('../routes/users.routes')
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        '/** 🚀 Listening in port ',
        this.port,
        ' **/'
      );
    });
  }
}

module.exports = Server;
