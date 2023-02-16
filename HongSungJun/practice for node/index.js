import express from 'express'
import {router as goodsRouter} from './routes/good.js'
const app = express()


app.use("/api",[goodsRouter])

app.listen(3000, () => {
    console.log("3000번 포트로 서버가 열렸습니다.")
})