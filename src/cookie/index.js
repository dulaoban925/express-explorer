const express = require('express')
const router = express.Router()
const users = require('../../users')
const checkCookieAuth = require('../../middlewares/checkCookieAuth')

// 账号相关 cookie 名称
const COOKIES = {
  USERNAME: 'username'
}

// 登录
router.post('/login', (req, res) => {
  const { username, password } = req.body

  // 校验用户是否存在
  const user = users[username]
  if (!user) {
    res.send('用户不存在')
    return
  }
  // 验证用户名和密码
  if (username === user.username && user.password) {
    // cookie 配置
    const cookieOptions = {
      httpOnly: true, // 不允许客户端修改
      maxAge: 60 * 1000
    }
    res.cookie(COOKIES.USERNAME, username, cookieOptions)
    res.send('<h1>登录成功</h1><a href="/cookie/helloWorld">HelloWorld</a> <a href="/cookie/logout">Logout</a>')
  } else {
    res.send('账号名或密码错误')
  }
})

// 登出
router.get('/logout', (req, res) => {
  console.log(process.env.NODE_ENV)
  res.clearCookie(COOKIES.USERNAME)
  res.redirect('/login');
})

// 业务接口，测试
router.get('/helloWorld', checkCookieAuth, (req, res) => {
  res.send('Hello world')
})

// 业务接口，测试
router.get('/helloDulaoban', checkCookieAuth, (req, res) => {
  res.send('Hello dulaoban')
})


module.exports = router