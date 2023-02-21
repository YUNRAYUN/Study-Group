import mongoose from "mongoose";

const goodsSchema = new mongoose.Schema({
    goodsId: {
        type : Number,
        required : true,
        unique: true
    },
    name: {
        type : String,
    },
    price: {
        type: Number
    }
})

export const goods = mongoose.model("goods",goodsSchema)