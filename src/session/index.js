const express = require('express')
const router = express.Router()
const users = require('../../users')
const checkSessionAuth = require('../../middlewares/checkSessionAuth')

// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body

  // 校验用户是否存在
  const user = users[username]
  if (!user) {
    res.send('用户不存在')
    return
  }
  // 验证用户名和密码
  if (username === user.username && password === user.password) {
    // 生成 session
    req.session.regenerate((err) => {
      if (err) next(err)
      // 设置 session 中存储用户名
      req.session.username = username
      // 将 session 保存在数据库中
      req.session.save((err) => {
        if (err) return next(err)
        res.send('<h1>登录成功</h1><a href="/session/logout">Logout</a>')
      })
    })
  } else {
    res.send('账号名或密码错误')
  }
})

// 登出
router.get('/logout', (req, res) => {
  // 清除 session 中的用户名内容
  req.session.username = null
  // 将无 username 的 session 保存到数据库中，后续权限验证校验 req.session.username 是否存在即可。
  req.session.save((err) => {
    if (err) next(err)
    // 重新生成 SID 和 Session 实例，使原 SID 和 Session 实例失效
    req.session.regenerate((err) => {
      if (err) next(err)
      res.redirect('/login');
    })
  })
})

// 业务接口，测试
router.get('/helloWorld', checkSessionAuth, (req, res) => {
  res.send('<p>Hello world</p><a href="/session/logout">Logout</a>')
})

module.exports = router