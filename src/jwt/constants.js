// 登录链接
const LOGIN_LINK = '<a href="/login?authType=jwt">前往登录</a>'
// 登出链接
const LOGOUT_LINK = '<a href="/jwt/logout">登出</a>'
// jwt 加密 key
const SECRET_KEY = 'dulaoban'
// Cookie key
const COOKIE_KEY = 'jwt'


module.exports = {
  LOGIN_LINK,
  LOGOUT_LINK,
  SECRET_KEY,
  COOKIE_KEY
}