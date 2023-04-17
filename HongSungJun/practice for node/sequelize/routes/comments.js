const express = require('express')
const {User,Comment} = require('../models/index')

const router = express.Router()

router.post('/', async (req,res,next) => {
    try {
        const comment = await Comment.create({
            UserId: req.body.id,
            comment: req.body.comment
        })
        res.json(comment)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.route('/:id')
.patch(async (req,res,next) => {
    try {
        const result = await Comment.update({
            comment: req.body.comment
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json(result)
    } catch (error) {
        next(error)
    }
})
.delete(async (req,res,next) => {
    try {
        const result = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router