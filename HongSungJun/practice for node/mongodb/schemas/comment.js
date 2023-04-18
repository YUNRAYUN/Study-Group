const mongoose = require('mongoose')

const {Types :{ObjectId}} = mongoose.Schema

const commentSchema = new mongoose.Schema({
    userId:{
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    comment:{
        type: String,
        required: true,
        
    },
    createdAt:{
        type: Date,
        default: Date.now()
        
    },
})

module.exports = mongoose.model('Comment',commentSchema)