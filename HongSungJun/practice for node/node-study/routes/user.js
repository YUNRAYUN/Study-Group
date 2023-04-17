const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    res.send('hello, user')

})

router.route('/abc')
.get((req,res) => {
    res.send("abc get 요청")
})
.post((req,res) => {
    res.send("abc post 요청")
})

module.exports = router