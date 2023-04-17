const express = require('express')
const {User,Comment} = require('../models')

const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        const users = await User.findAll()
        res.render('sequelize', {users})
    } catch (error) {
        next(error)
    }
})

module.exports = router