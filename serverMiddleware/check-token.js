// serverMiddleware/check-token.js

var jwt = require('jsonwebtoken')
// const config = require('./config')
const JWT_SIGN_SECRET = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJ6CX1hGEDhWe8`
const IGNORED_PATHS = ['/auth/login', '/auth/logout', '/auth/refresh']

const authentication = (req, res, next) => {
  console.log('[serverMiddleware/check-token.js] req.originalUrl =', req.originalUrl)
  // console.log('[serverMiddleware/check-token.js] isIgnored =', isIgnored)
  const isIgnored = IGNORED_PATHS.some(path => req.originalUrl.includes(path))
  if (isIgnored) next()

  let token
  try {
    token = req.headers['authorization'].split(' ')[1]
  } catch (e) {
    token = ''
  }
  console.log('[serverMiddleware/check-token.js] token =', token)

  // let expired = false
  // let payload = {
  //   "status": "failed",
  //   "text_code": "TOKEN_EXPIRED",
  //   "message": "The JWT token is expired",
  //   "status_code": 401
  // }

  // jwt.verify(token, JWT_SIGN_SECRET, function (err, decoded) {
  //   console.log('[serverMiddleware/check-token.js] decoded =', decoded)
  //   if (err) {
  //     // return res.status(401).json({ message: 'Unauthorized!' })
  //     // res.status(401).json(payload)  // 回傳401錯誤
  //     console.log('[serverMiddleware/check-token.js] payload =', payload)
  //     return
  //   }
  //   else {
  //     next()
  //   }
  // })

  next()
}

module.exports = authentication;