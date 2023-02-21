import express from 'express'
import mongoose from 'mongoose'
import {router as goodsRouter} from './routes/good.js'
import {cookieRouter} from './routes/cookie.js'
import {cartRouter} from './routes/cart.js'
const app = express()


app.use("/api",[goodsRouter,cartRouter])

app.use('/cookie', [cookieRouter])

app.listen(3000, () => {
    console.log("3000번 포트로 서버가 열렸습니다.")
})

mongoose.connect("mongodb://localhost:27017/myproject10").then(() => {
    console.log("데이터베이스 연결에 성공하였습니다.")
})