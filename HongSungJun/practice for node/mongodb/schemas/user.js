const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now()      
    },
    married: {
        type: Boolean,
        required: true,
        
    },
    comment: String
})

module.exports = mongoose.model('User',userSchema)