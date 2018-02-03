const url = require("url");
const fs = require("fs");
const path = require("path");
const ejs = require('ejs')
const mime = require('../config/mime.js')

const tplPath = path.join(__dirname,'./dir.ejs')
const dir = fs.readFileSync(tplPath,{encoding:'utf-8'})


function view(public,staticPath) {
  return  function(req, res, next) {
    const pathObj = url.parse(req.url, true);
    const filePath = path.resolve(staticPath, pathObj.pathname.substr(1));
    const publicDir = public
    fs.stat(filePath, (err, stats) => {
      if (err) {
         next()
         return 
      }
      if (stats.isFile()) {
        const contentType = mime(filePath)
        res.statusCode = 200;
        res.setHeader('Content-Type',contentType)
        fs.createReadStream(filePath).pipe(res);
      } else if (stats.isDirectory()) {
        var dirname = path.relative(process.cwd(),filePath).replace(publicDir,'')
        fs.readdir(filePath, (err, files) => {
          var data = {
            dirname : `${dirname}/`,
            files
          }
          var template = ejs.render(dir,data)
          res.statusCode = 200;
          res.end(template);
        });
      }
    });

  };
}

module.exports = view;
