
const express = require('express')
const User = require('../schemas/user')
const Comment = require('../schemas/comment')

const router = express.Router()

router.route('/')
.get(async (req,res,next) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        next(error)
    }
})
.post(async (req,res,next) => {
    const {name, age,married} = req.body

    const user = await User.create({
        name,
        age,
        married,
    })    
    res.json(user)
})

router.get('/:id/comments', async (req,res,next) => {
    const comment = await Comment.find({userId : req.params.id}).populate('userId')
    console.log(comment)
    res.json(comment)
})

module.exports = router