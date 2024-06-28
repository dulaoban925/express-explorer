const jwt = require('jsonwebtoken')
const users = require('../users')
const { LOGIN_LINK, SECRET_KEY, COOKIE_KEY } = require('../src/jwt/constants')
const { BLACK_LIST } = require('../src/jwt/store')

function checkJwtAuth (req, res, next) {
  const token = req.cookies[COOKIE_KEY]
  // 若请求为携带 token，或 token 已加入黑名单，视为”未登录“状态
  if (!token || BLACK_LIST.includes(token)) {
    res.send(`<h1>请先登录</h1>${LOGIN_LINK}`)
    return
  }

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    // 若 token 已失效，重新登录
    if (err) {
      res.send(`<h1>请先登录</h1>${LOGIN_LINK}`)
      return
    }
    // 校验 token 内用户是否存在
    const username = payload.username
    const user = users[username]
    if (!user) {
      res.send(`<h1>用户不存在，请重新登录</h1>${LOGIN_LINK}`)
      return
    }
    next()
  })
}

module.exports = checkJwtAuth