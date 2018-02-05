## smallmoon

node静态资源服务器(低仿express)

## 安装

git clone git@github.com:Chrisxmy/node-server.git

## 使用

smallmoon # 把当前文件夹作为静态资源服务器根目录

smallmoon -p 8080 # 设置端口号为 8080

smallmoon -h localhost # 设置 host 为 localhost

smallmoon -d /usr # 设置根目录为 /usr

## 配置中间件
example: 
app.js文件
```javascript
 app.use(function(req, res, next) {
   console.log('middleware 1')
   next()
 })
```