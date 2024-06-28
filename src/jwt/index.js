const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const users = require('../../users')
const checkJwtAuth = require('../../middlewares/checkJwtAuth')
const { LOGIN_LINK, LOGOUT_LINK, SECRET_KEY, COOKIE_KEY } = require('./constants')
const { BLACK_LIST } = require('./store')

// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body

  // 校验用户是否存在
  const user = users[username]
  if (!user) {
    res.send('用户不存在')
    return
  }
  // 验证用户名和密码是否正确
  if (username === user.username && password === user.password) {

    // 生成 jwt
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: 60 * 60
    })

    // 将 jwt 存储到 cookie 中
    res.cookie(COOKIE_KEY, token, {
      httpOnly: true,
      maxAge: 60 * 1000
    })

    res.send(`<h1>登录成功</h1>${LOGOUT_LINK}`)
  } else {
    res.send('账号名或密码错误')
  }
})

// 登出
router.get('/logout', (req, res) => {
  const token = req.cookies[COOKIE_KEY]
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      res.send(`<h1>登出成功</h1>${LOGIN_LINK}`);
      return
    }
    // 清除 jwt cookie
    res.clearCookie(COOKIE_KEY)
    // 加入黑名单
    !BLACK_LIST.includes(token) && BLACK_LIST.push(token)
    res.send(`<h1>登出成功</h1>${LOGIN_LINK}`);
  })
})

// 业务接口，测试
router.get('/helloWorld', checkJwtAuth, (req, res) => {
  res.send('Hello world')
})

module.exports = router