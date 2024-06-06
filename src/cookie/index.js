const express = require('express')
const router = express.Router()
const users = require('../../users')

// 账号相关 cookie 名称
const COOKIES = {
  username: 'username',
  PWD: 'password'
}

// 登录
router.post('/login', (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  // 校验用户是否存在
  const user = users[username]
  if (!user) {
    res.send('用户不存在')
    return
  }
  // 匹配用户名和密码
  if (username === user.username && password === user.password) {
    // cookie 配置
    const cookieOptions = {
      httpOnly: true, // 不允许客户端修改
      maxAge: 60 * 1000
    }
    res.cookie(COOKIES.username, username, cookieOptions)
    res.cookie(COOKIES.PWD, password, cookieOptions)
    res.send('登录成功')
  } else {
    res.send('账号名或密码错误')
  }
})

// 登出
router.get('/logout', (req, res) => {
  res.clearCookie(COOKIES.username)
  res.clearCookie(COOKIES.PWD)
  res.redirect('/login');
})

// 业务接口，测试
router.get('/search', (req, res) => {

})


module.exports = router