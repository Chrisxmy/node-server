const yargs = require('yargs')
const Server = require('./bin/server.js')

const argv = yargs
   .usage('shel [option]')
   .option('p',{
       alias:'port',
       describe:'端口号',
       default: 8486
   })
   .option('h',{
       alias:'hostname',
       describe:'host',
       default: '127.0.0.1'
   })
    .option('d',{
       alias:'root',
       describe:'root path',
       default: process.cwd()
   })
    .version()
    .alias('v','version')
    .help()
    .argv;
    
console.log(argv)

const server = new Server(argv);
server.start()