const express = require('express')
const {User,Comment} = require('../models/index')


const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        const users = await User.findAll()
        res.json(users)
        
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

router.post('/', async (req,res,next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married
        })
        res.json(user)
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

router.get('/:id/comments', async (req,res,next) => {
    try {
        const comment = await Comment.findAll({
            include: {
                model: User,
                where : {id: req.params.id}
            }
        })
        console.log(comment)
        res.json(comment)
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

module.exports = router
