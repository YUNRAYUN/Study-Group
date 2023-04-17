const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const indexRouter = require('./routes/index.js')
const userRouter = require('./routes/user.js')

const app = express()

try{
    fs.readdirSync('uploads')
}
catch(err){
    console.log("업로드 파일이 없어 폴더를 생성합니다.")
    fs.mkdirSync('uploads')
}

app.set('port', Number(process.env.port))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true
    },
    name : 'connect.sid'
}))
app.use('/', indexRouter)
app.use('/user', userRouter)


const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,done) {
            done(null, 'uploads/')
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname)
            done(null,path.basename(file.originalname,ext) + Date.now() + ext)
        },
    }),
    limits: { fileSize : 5 * 1024 * 1024}
})



app.post('/upload', upload.array('image'), (req,res) => {
    console.log(req.files)
    res.send('ok')
})

app.use((err,req,res,next) => {
    res.send("에러 났지롱 하하하ㅏ")
    
})



app.listen(app.get('port'), () => {
    console.log("서버 실행")
})

