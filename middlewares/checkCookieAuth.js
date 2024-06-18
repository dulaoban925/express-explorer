const users = require('../users')
function checkCookieAuth (req, res, next) {
  const { username } = req.cookies
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

module.exports = checkCookieAuth