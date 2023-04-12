const express = require('express')

const app = express()

app.set('port', process.env.port || 3000)

app.use((req,res,next) => {
    console.log("미들웨어입니다.")
    next()
})

app.get('/', (req,res) => {
    res.send('hello express')
})

app.listen(app.get('port'), () => {
    console.log("서버 실행")
})