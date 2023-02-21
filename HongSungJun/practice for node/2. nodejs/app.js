import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import {User} from './model/user.js'
import jwt from 'jsonwebtoken'
import {qqq} from './middlewares/auth-middleware.js'
import 'dotenv/config'

mongoose.connect("mongodb://localhost:27017/myproject10").then(() => {
    console.log("데이터베이스 연결에 성공하였습니다.")
})

const app = express()
const router = express.Router()

// app.use('/api',express.urlencoded({extended : false}),router)
app.use('/api',express.json(),router)
app.use(express.static("assets"))

router.post('/users', async (req,res) => {
    const {email,nickname,password,confirmPassword} = req.body
    console.log(email,nickname,password,confirmPassword)
    if(password !== confirmPassword){
        res.status(400).send({
            errorMessage: "패스워드가 확인란과 다릅니다."
        })
        return
    }

    const existUser = await User.findOne({
        $or: [{email}, {nickname}]
    })
    if(existUser){
        res.status(400).send({
            errorMessage: "이메일 또는 닉네임이 이미 사용중입니다."
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({email,nickname,password:hashedPassword})
    await user.save()

    res.status(201).send("회원가입에 성공하였습니다.")
})

router.post("/auth", async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(400).send({
            errorMessage: "해당 이메일로 된 회원가입정보가 없습니다."
        })
    }

    const isAuth = await bcrypt.compare(password,user.password)

    if(!isAuth){
        res.status(400).send({
            errorMessage: "비밀번호가 틀립니다"
        })
    }
    res.send({
        token : jwt.sign({userId : user._id},process.env.SECRET_KEY)
    })
})

router.get('/users/me', qqq, async (req,res) => {
    res.send({user: res.locals.user})
})

app.listen(3000, () => {
    console.log("3000번 포트로 서버가 열렸습니다.")
})