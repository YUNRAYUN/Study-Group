import express from 'express'
const router = express.Router()

const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
          "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
      },
      {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
          "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
      },
      {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
          "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
      },
      {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
          "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
      },
]
router.get("/", (req,res) => {
    res.send('this is home page')
})

router.get('/about',(req,res) => {
    res.send('this is about page')
})
router.get("/goods", (req,res) => {
    
    res.json({goods: goods})
})
router.get("/goods/:goodsId", (req,res) => {
    const id = Number(req.params.goodsId)
    const result = goods.filter((el) => el.goodsId === id)
    res.json({goodsId : result})
})  

export {router}
