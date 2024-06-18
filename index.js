const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MysqlStore = require('express-mysql-session')(session)
const cookieRouter = require('./src/cookie')
const sessionRouter = require('./src/session')
const path = require('path')

// express 应用实例
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 解析 post 请求体
app.use(express.urlencoded({ extended: false }))

// 安装 CookieParser 中间件
app.use(cookieParser())

// session mysql store 配置对象
// 需根据自己的环境修改配置
const mysqlOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin0125',
  database: 'db_session'
}

// session 中间件
const sessionMiddleware = session({
  resave: false, // session 未变更不重新保存
  saveUninitialized: false, // session 为初始化时不存储
  secret: 'dulaoban', // 用于 sessionID 签名的秘钥
  store: new MysqlStore(mysqlOptions)
})

// 安装 sessionMiddleware
app.use(sessionMiddleware)
// 安装 Session Router
app.use('/session', sessionRouter)

// 安装 Cookie Router
app.use('/cookie', cookieRouter)

// 登录页面映射
const loginPages = {
  cookie: 'cookie-login',
  session: 'session-login'
}
// 登录页
app.use('/login', (req, res) => {
  const authType = req.query.authType ?? 'cookie'
  const loginPage = loginPages[authType]
  res.render(loginPage)
})

// 定义服务启用端口号
const port = 3000

app.listen(port, () => {
  console.log(`服务已启动... \n访问 http://localhost:${port}`)
})