// serverMiddleware/login.js
import express from 'express'
import jwt from 'jsonwebtoken'      // STEP 1: 引用 jsonwebtoken 
import bodyParser from 'body-parser'

// Create express instance
const app = express()

app.post('/api/auth/login', bodyParser.json({ limit: '10240mb' }))
app.post('/api/auth/login', async (req, res, next) => {
  console.log('[serverMiddleware/login.js][/api/auth/login] req.originalUrl =', req.originalUrl)
  console.log('[serverMiddleware/login.js][/api/auth/login] req.body =', req.body)

  try {
    // get request parameters
    const { email_address, password } = req.body
    // const user = await query(`SELECT username,password FROM User WHERE username='${username}' `)

    // get user info
    const user = {
      id: 1,
      email_address: 'me@example.com',
      username: "Molly Huang",
      password: "abc123"
    }
    // console.log('[serverMiddleware/login.js][/api/auth/login] user =', user)

    // check user info
    if (user.email_address !== email_address) {
      res.status(404).json({ msg: "Email錯誤" })  // 回傳404錯誤
      console.log('[serverMiddleware/login.js][/api/auth/login] Email錯誤 =', email_address)
      return
    }
    else if (user.password !== password) {
      res.status(403).json({ msg: "密碼錯誤" })  // 回傳403錯誤
      console.log('[serverMiddleware/login.js][/api/auth/login] 密碼錯誤 =', password)
      return
    }

    // Get token payload
    const token = giveMeToken(user)
    const payload = { access_token: token, refresh_token: token }

    res.status(200).json({ user, payload })  // 回傳200 user & token
  }
  catch (error) {
    console.log('[serverMiddleware/login.js][/api/auth/login] error =', error)
    res.status(500).json({ msg: "err" })  // 回傳500錯誤
  }
})

// app.post('/api/auth/logout', bodyParser.json({ limit: '10240mb' }))
// app.post('/api/auth/logout', async (req, res, next) => {
//   console.log('[serverMiddleware/login.js][/api/auth/logout] req.originalUrl =', req.originalUrl)
//   console.log('[serverMiddleware/login.js][/api/auth/logout] req.body =', req.body)
// })

function giveMeToken(user) {
  // console.log('[serverMiddleware/login.js][giveMeToken] user =', user)
  // 產生 JWT - 使用 jsonwebtoken 套件
  // jsonwebtoken 產生token的寫法是sign，他會需要使用一組你自己定義的密碼去進行編碼，
  // 敏感資訊的內容另外放在一個config檔裡面，這個config檔案是不能上傳到公開倉庫的，像是 jwt 密碼、資料庫帳密…等

  const JWT_SIGN_SECRET = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJ6CX1hGEDhWe8`
  // const JWT_SIGN_SECRET = `-----BEGIN PRIVATE KEY-----
  // MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJ6CX1hGEDhWe8
  // fru83BYzdTj5sOzES49k19LnGYMDH6Q27VluaL2wso1dBifo44J6MP75B/TPBOfj
  // 6qDNCcMp9DXmKczvKd+LmKiR/CfKWhBaaHDBZTSiAz55kiopDiC3bxk/FtdrtbYp
  // vK9Lrf/F2oiwHU+NL3gOf1bighW3oGs9KDo6CuVkXA88p1wsnSzB92ip/6BYbv5I
  // nNeW6OJLnmBjRHIY02zZU3GHMsJbDMZPZuFzSxTvkpm6YDAHF6QtErvA6H5rq4oW
  // zCqZm4rbNpZgOifZhHuJWQG0hMaUUXvGGqGP8EcNwBG1NSiU+HxdlzH3uJr8SmlB
  // aQWUjKXlAgMBAAECggEABRPBYJsjlWMVaLgHIIioRkL8W8sHKSh9QpvqwcTydnGl
  // P3xYc15O5tKWm3A8MK8H6OqyfrCkh1AoRKLxyDYmojdx44fJj3oOFQSRuJoOphf9
  // sUhPDY3t9OT//S6fwMiKKhKxH9UDNcIsAoCsJ8sIU4FbTpJuHa7D5hltpeR/h06F
  // 7IABNnP5n+HSX/WIhqzCLq7MHPMpEK2fFHP83gNvsTPmTHctaGhfVIbFRBfEgqzO
  // e4duZswaFPCsbsKhJNxJlklxqfjxakhaaJrI+vmTgnWnJsa/8jZjXAGgJgn8+CkI
  // OE4rfGdQUVDpSZUDryLiQfmUhPXXMgqL5ilLh8sRQQKBgQD1AhQdD9h26ut5QJEa
  // 1bhIcbxu6fdNq1W69TgFzS0b89mPdjaYm0REmn8risSAtWvVvELACN39VbYEoBDc
  // 9dq+31XBqmbdpIhvLeTwjFVEzJwK2AIf6O7CmVMurQaN6t2sqEDNV2FxWszFg/fS
  // RDKlo1yTh64B5fe0cxG98wDkmwKBgQDS9w0DTqw0tcwySmR4m6pZ1kqyVUWGRig2
  // k4nlXFO+KnkWdiUrkwe92nbKgxrmjJHY6TZ4rmMDjj/JYoiBIIyrvRysgjfICzZC
  // hyoWXGlOIRBaYMckX3IPjlD8F1EEIk536yZJ4SH8IB5jaqse/buuNKl0aXYRpjUz
  // dA7weMEHfwKBgQDPFryte9E5YoM576s2hWLISOo+zZ9slN9XsSFzNeNk9w3zRrYK
  // 82IWoofO4/IH4FCPThsVeek40hORgUH/ogcMwnUXxtI/kWyInMAf2l3QUympuL7C
  // /f2hmjtG/pTFq7lG0MhFSBBi4Z6nbE4x+dbdTmFXiZ04mYpvibt7VERy9QKBgHR0
  // XeGSfysFo/eq6zVMsMewrEEvIxbRCYe+/+L1iWCzL25/v1sDacWan/KAVswnkqcL
  // bb9GfG/NCVcQpkupfR2cYgS0STiLP+OPm2MGljbDt7Q8MhHZAiymIfxWnqlKishV
  // rSghN9JmpH+6tUWBSSYL+fLB+KQbfMiva0PBVMTfAoGBAIA6cyjdooqW2DBLV0Hu
  // 8YpyX2TqWFYx+RP5sEDVbVVH/kBtXkgQQ4/ESJjIgX5zn5dHgl01JTLdnsjNZ97M
  // gBzchFqS5jVOPXnuRFfUgYHIaN4QQUsVPgaX0PgZq8EQUEgFScF584yvf4iRIuFU
  // TdDQXoXHu7+3UBIT0RRDt5eW
  // -----END PRIVATE KEY-----`

  const header = {
    algorithm: 'HS256'
  }

  // STEP 2: 產生 Payload 內容
  let payload = {
    id: user.id,
    email: user.email,
    iat: ~~(new Date().getTime() / 1000), // now
    exp: ~~(new Date(new Date().getTime() + 1000 * 60 * 60 * 24).getTime() / 1000),   // 1 天
  };

  // STEP 3: 使用 jwt.sign 產生 Token
  const jwtToken = jwt.sign(payload, JWT_SIGN_SECRET, header)
  // const token = jwt.sign({ username, password }, JWT_SIGN_SECRET)
  // const token = jwt.sign(user, JWT_SIGN_SECRET)
  console.log('[serverMiddleware/login.js][giveMeToken] jwtToken =', jwtToken)

  return jwtToken
}

// function checkToken() {
//   let payload = {
//     "status": "failed",
//     "text_code": "TOKEN_EXPIRED",
//     "message": "The JWT token is expired",
//     "status_code": 401
//   }

//   if (expired) {
//     res.status(401).json({ payload })  // 回傳401錯誤
//     console.log('[serverMiddleware/login.js][checkToken] payload =', payload)
//     return
//   }
// }

export default {
  handler: app
}
