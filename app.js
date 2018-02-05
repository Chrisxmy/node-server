var express = require('./lib/express')
var path = require('path')
var bodyParser = require('./lib/body-parser')
var view = require('./lib/view')

var fs = require('fs')

var app = express()


app.use(bodyParser)

app.use(view('static',path.join(__dirname, 'static')))


// app.use(function(req, res, next) {
//   console.log('middleware 1')
//   next()
// })


// app.use('/hello', function(req, res, next){
//   res.send('hello world')
// })

// app.use('/getWeather', function(req, res){
//   res.send({url:'/getWeather', city: req.query.city})
// })


app.use('/search', function(req, res){
  res.send(req.body)
})

app.use(function(req, res){
    var filePath = path.join(__dirname, 'static','404.html')
    fs.readFile(filePath, 'binary', function(err, content){
      if(err){
        next()
      }else {
        res.statusCode  = 404
        res.write(content, 'binary')
        res.end()        
      }
    })

})

// response.writeHead(302, {
//   'Location': 'your/404/path.html'
//   //add other headers here...
// });
// response.end();


module.exports = app

