// serverMiddleware/access.js
import express from 'express'
import bodyParser from 'body-parser'
import authentication from './check-token'

// Create express instance
const app = express()
// app.use([authentication);  // 在所有api最上面引用 authentication

// 在指定 URL 最上面引用 authentication
app.use(['/groups', '/about'], authentication)

// app.use('/groups', bodyParser.json({ limit: '10240mb' }));
// app.use('/groups', async (req, res, next) => {
//   console.info('[serverMiddleware/access.js][/groups] req.originalUrl =', req.originalUrl)

//   // token的處理邏輯
//   // 在系統中有註冊登入等功能模組時，就需要用到token的管理。在nuxt專案後臺中，同express應用一樣，我們可以使用express-jwt來實現。
//   // express-jwt有多種加密方案，我們這裡採用rsa方案，先生成公鑰和私鑰儲存在根目錄。
//   // 我們一般在使用者登入成功之後生成token，並在返回報文中返回給瀏覽器，
//   // 由瀏覽器儲存並在下一個介面新增到headers中，express-jwt提供了現成的介面生成token
//   // res.setHeader('Content-Type', 'application/json')
//   // res.writeHead(res.status)
//   // res.end(JSON.stringify(res.data))
// })

// app.post('/api/auth/logout', bodyParser.json({ limit: '10240mb' }))
// app.post('/api/auth/logout', async (req, res, next) => {
//   console.log('[serverMiddleware/login.js][/api/auth/logout] req.originalUrl =', req.originalUrl)
//   console.log('[serverMiddleware/login.js][/api/auth/logout] req.body =', req.body)
// })

export default {
  handler: app
}
