import jwt from 'jsonwebtoken'
import {User} from '../model/user.js'
import 'dotenv/config'

export function qqq(req, res, next) {
    const {authorization} = req.headers;
    const [authType,authToken] = (authorization || "").split(" ")
    console.log(req.headers)
    if(!authToken || authType !== "Bearer"){
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능합니다."
        })
        return
    }

    try{
        const {userId} = jwt.verify(authToken,process.env.SECRET_KEY)
        User.findOne({_id : userId}).then((user) => {
            res.locals.user = user;
            next()
        })
    }
    catch(err){
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다."
        })
    }

}