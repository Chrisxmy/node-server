const app = require("../app");

const http = require("http");

const baseConfig = require("../config/baseConfig.js");

class Server {
  constructor(config) {
    this.conf = Object.assign({}, baseConfig, config);
  }
  start() {
    let server = http.createServer(app);

    server.listen(this.conf.port,this.conf.host);

    console.log(`open ${this.conf.host}:${this.conf.port}`);
  }
}

module.exports = Server
