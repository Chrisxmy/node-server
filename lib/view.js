const url = require("url");
const fs = require("fs");
const path = require("path");
const ejs = require('ejs')
const mime = require('../config/mime.js')
const baseConfig = require('../config/baseConfig.js')
const compress = require('../lib/compress.js')
const range = require('../lib/rang.js')

const isFresh = require('../lib/cache.js')

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
        res.setHeader('Content-Type',contentType)

         // 缓存
        if(isFresh(stats,req,res)) {
          res.statusCode = 304
          res.end()
          return
        }

        let rs
        // 范围请求
        const {code,start,end} = range(stats.size, req,res)
        if(code === 200) {
           res.statusCode = 200;
           rs = fs.createReadStream(filePath)
        } else {
          res.statusCode = 206
          rs = fs.createReadStream(filePath,{start, end})
        }
        // 文件压缩
        if (filePath.match(baseConfig.compress)) {
          rs = compress(rs,req,res)
        }
        rs.pipe(res)
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
