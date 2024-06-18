const users = require('../users')
function checkSessionAuth (req, res, next) {
  const { username } = req.session
  // 验证 session 中是否存在用户名信息，若无，表示授权已失效，跳转到登录页
  if (!username) {
    res.redirect('/login')
    return
  }
  const user = users[username]
  if (!user) {
    res.send('用户不存在，请重新登录')
    return
  }
  next()
}

module.exports = checkSessionAuth