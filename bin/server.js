const app = require("../app");

const http = require("http");

const baseConfig = require("../config/baseConfig.js");
const openUrl = require('../lib/openUrl.js')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, baseConfig, config);
  }
  start() {
    let server = http.createServer(app);
    server.listen(this.conf.port,this.conf.host);
    let url = `http://${this.conf.host}:${this.conf.port}`
    
    console.log(`open ${url}`);

  }
}

module.exports = Server
