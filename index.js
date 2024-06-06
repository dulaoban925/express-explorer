const express = require('express')
const cookieParser = require('cookie-parser')
const cookieRouter = require('./src/cookie')
const path = require('path')

// express 应用实例
const app = express()
// 安装 CookieParser 中间件
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 解析 post 请求体
app.use(express.urlencoded({ extended: false }))

// 安装 Cookie Router
app.use('/cookie', cookieRouter)

// 登录页
app.use('/login', (req, res) => {
  res.render('login')
})

// 定义服务启用端口号
const port = 3000

app.listen(port, () => {
  console.log(`服务已启动... \n访问 http://localhost:${port}`)
})