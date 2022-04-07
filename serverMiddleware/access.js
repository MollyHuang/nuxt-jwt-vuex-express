// serverMiddleware/access.js
import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'

// Create express instance
const app = express()
const JWT_SIGN_SECRET = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJ6CX1hGEDhWe8`

const authentication = (req, res, next) => {
  let token
  try {
    token = req.headers['authorization'].split(' ')[1]
  } catch (e) {
    token = ''
  }

  jwt.verify(token, JWT_SIGN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' })
    } else {
      next()
    }
  })
}

// app.use(authentication);  // 在所有api最上面引用 authentication

app.post('/api/auth/validate', bodyParser.json({ limit: '10240mb' }));
app.post('/api/auth/validate', async (req, res, next) => {

  // token的處理邏輯
  // 在系統中有註冊登入等功能模組時，就需要用到token的管理。在nuxt專案後臺中，同express應用一樣，我們可以使用express-jwt來實現。
  // express-jwt有多種加密方案，我們這裡採用rsa方案，先生成公鑰和私鑰儲存在根目錄。
  // 我們一般在使用者登入成功之後生成token，並在返回報文中返回給瀏覽器，
  // 由瀏覽器儲存並在下一個介面新增到headers中，express-jwt提供了現成的介面生成token

  // const expiresIn = Date.now() + 7 * 864e5  // 7 天
  // res.data = {
  //   expiresIn,
  //   user: 'Molly',
  //   payload: {
  //     refresh_token: {
  //       httpOnly: true,    // 只能在網路傳輸中使用，當設為 true 時，此 Cookie 就無法在任何 JavaScript 程式碼中取得
  //       expires: new Date(expiresIn),
  //     },
  //     access_token: {
  //       httpOnly: true,
  //       expires: new Date(expiresIn),
  //     }
  //   }
  // }

  // res.setHeader('Content-Type', 'application/json')
  // res.writeHead(res.status)
  // res.end(JSON.stringify(res.data))
})

export default {
  handler: app
}
