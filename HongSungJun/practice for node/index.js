import express from 'express'
import {router as goodsRouter} from './routes/good.js'
import {cookieRouter} from './routes/cookie.js'
const app = express()


app.use("/api",[goodsRouter])

app.use('/cookie', [cookieRouter])

app.listen(3000, () => {
    console.log("3000번 포트로 서버가 열렸습니다.")
})