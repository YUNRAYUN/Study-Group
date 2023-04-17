const express = require('express')
const path = require("path")
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const {sequelize} = require('./models')
const { networkInterfaces } = require('os')


const app = express()

app.set('port', process.env.PORT || 3001)
app.set('view engine', 'html')

nunjucks.configure('views', {
    express : app,
    watch : true
})

sequelize.sync({force : false}).then(() => {
    console.log("연결 성공")
})
.catch((err) => {
    console.log("연결 실패",err)
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use((req,res,next) => {
    const error = new Error("라우터가 없습니다.")
    error.status = 404
    next(error)
})