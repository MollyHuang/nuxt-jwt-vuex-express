// serverMiddleware/login.js
import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'

// Create express instance
const app = express()
const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

app.post('/api/auth/login', bodyParser.json({ limit: '10240mb' }))
app.post("/api/auth/login", async (req, res, next) => {
  // console.log('[serverMiddleware/login.js][/api/auth/login] req.originalUrl =', req.originalUrl)
  // console.log('[serverMiddleware/login.js][/api/auth/login] req.body =', req.body)

  try {
    const { email_address, password } = req.body
    // const user = await query(`SELECT username,password FROM User WHERE username='${username}' `)

    const user = {
      id: 1,
      email_address: 'me@example.com',
      username: "Molly Huang",
      password: "abc123"
    }
    // console.log('[serverMiddleware/login.js][/api/auth/login] user =', user)

    if (user.email_address !== email_address) {
      res.status(404).json({ msg: "Email錯誤" })
      console.log('[serverMiddleware/login.js][/api/auth/login] Email錯誤 =', email_address)
      return
    }
    else if (user.password !== password) {
      res.status(403).json({ msg: "密碼錯誤" })
      console.log('[serverMiddleware/login.js][/api/auth/login] 密碼錯誤 =', password)
      return
    }

    // jsonwebtoken 產生token的寫法是sign，他會需要使用一組你自己定義的密碼去進行編碼，
    // 敏感資訊的內容另外放在一個config檔裡面，這個config檔案是不能上傳到公開倉庫的，像是 jwt 密碼、資料庫帳密…等
    // const token = jwt.sign({ username, password }, JWT_SIGN_SECRET);
    const token = jwt.sign(user, JWT_SIGN_SECRET)
    // console.log('[serverMiddleware/login.js][/api/auth/login] token =', token)
    const payload = { access_token: token, refresh_token: token }
    res.status(200).json({ user, payload })
  }
  catch (error) {
    console.log('[serverMiddleware/login.js][/api/auth/login] error =', error);
    res.status(500).json({ msg: "err" });
  }
});

export default {
  handler: app
}
