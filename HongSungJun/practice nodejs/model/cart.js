import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    goodsId : {
        type: Number,
        required : true,
        unique: true
    },
    quantity: {
        type : Number,
        required: true
    }
})

export const Cart = mongoose.model("Cart",cartSchema)