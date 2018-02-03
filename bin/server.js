var app = require("../app");

const http = require("http");



let server = http.createServer(app);

server.listen(8486);

console.log("open localhost:8486");
