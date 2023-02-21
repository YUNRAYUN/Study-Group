import { getElementsByTagType } from 'domutils'
import express from 'express'
import {Cart} from '../model/cart.js'
import {goods as Goods} from '../model/goods.js'
const router = express.Router()
router.use(express.json())

router.get('/carts', async (req,res) => {
    const carts = await Cart.find()
    const goodsIds = carts.map((el) => el.goodsId)
    const goods = await Goods.find({goodsId : goodsIds})
    const results = carts.map((el) => {
        return {
            quantity : el.quantity,
            goods: goods.find((els) => els.goodsId === el.goodsId)
        }
    })

    res.json({
        carts: results
    })
})

router.post('/goods/:goodsId/cart', async (req,res) => {
    const {goodsId} = req.params
    const {quantity} = req.body

    const existsCarts = await Cart.find({goodsId: Number(goodsId)})

    if(existsCarts.length){
        return res.status(400).send("장바구니에 이미 존재합니다.")
    }

    await Cart.create({goodsId: Number(goodsId),quantity})

    return res.send("등록에 성공하였습니다.")
})

router.put('/goods/:goodsId/cart', async (req,res) => {
    const {goodsId} = req.params
    const {quantity} = req.body

    const goods = await Cart.find({goodsId})

    if(goods.length){
       await Cart.updateOne({goodsId},{quantity: quantity})
       return res.send("상품의 수량이 수정되었습니다.")

    }
    else{
        return res.status(400).send("해당 상품이 존재하지 않습니다.")
    }
})

router.delete('/goods/:goodsId/cart', async (req,res) => {
    const {goodsId} = req.params

    const goods = await Cart.find({goodsId})

    if(goods.length){
        await Cart.deleteOne({goodsId})
        return res.send("해당 상품이 삭제되었습니다.")
    }
    else{
        return res.status(400).send("해당 상품이 존재하지 않습니다.")
    }
})

export {router as cartRouter}