const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require("express-session")

const app = express()

app.set('port', process.env.port || 3000)

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret: "",
    cookie : {
        httpOnly : true
    },
    name : 'connect.sid'
}))


app.get('/', (req,res) => {
    res.send('hello express')
})

app.use((err,req,res,next) => {
    res.send("에러 났지롱 하하하ㅏ")
    
})

app.listen(app.get('port'), () => {
    console.log("서버 실행")
})

