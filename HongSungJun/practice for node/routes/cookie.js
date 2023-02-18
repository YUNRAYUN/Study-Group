import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

let tokenObj = {}
const SECRET_KEY = "1234"

router.get('/set-Cookie', (req,res) => {
    const expire = new Date()
    expire.setMinutes(expire.getMinutes() + 60)

    res.cookie('name', 'Hello', {
        expires : expire
    })
    return res.status(200).end()
})

router.get('/get-Cookie', (req,res) => {
    const cookie = req.headers.cookie
    console.log(cookie)
    return res.status(200).json({cookie})
})

router.get('/set-token/:id',(req,res) => {
    const id = req.params.id
    const accessToken = createAccessToken(id)
    const refreshToken = createRefreshToken()

    tokenObj[refreshToken] = id
    res.cookie('accessToken',accessToken)
    res.cookie('refreshToken',refreshToken)

    return res.status(200).json({'message': "Token이 정상적으로 발급되었습니다."})

})

router.get('/get-token',(req,res) => {
    
    const token = req.headers.cookie

    
    const accessToken = token.split(";")[1].replace(' accessToken=',"")
    const refreshToken = token.split(";")[2].replace(' refreshToken=',"")
    
    
    if(!accessToken){
        return res.status(400).send("accessToken이 존재하지 않습니다.")
    }
    if(!refreshToken){
        return res.status(400).send("refreshToken이 존재하지 않습니다.")
    }
    console.log(accessToken,refreshToken)
    const isAceess = validateAccessToken(accessToken)
    const isRefresh = validateRefreshToken(refreshToken)
    console.log(isAceess,isRefresh)
    if(isRefresh === false){
        return res.status(419).json({"message" : "리프레시 토큰이 만료되었습니다."})
    }

    if(isAceess === false){
        const id = tokenObj[refreshToken]
        if(!id) return res.status(419).json({"message" : "리프레시 토큰 정보가 서버에 존재하지 않습니다."})

        const newAccessToken = createAccessToken(id)
        res.cookie("accessToken",newAccessToken)
        return res.json({"message" : "액세스 토큰을 재발급 하였습니다."})
    }

    const {id} = getAccessTokenPayload(accessToken)
    return res.json({"message" : `${id}의 정보를 가진 토큰이 성공적으로 인증되었습니다.`})

})

const createAccessToken = (id) => {
    const accessToken = jwt.sign(
        {id : id},
        SECRET_KEY,
        {expiresIn : '10s'}
    )
    return accessToken
}

const createRefreshToken = () => {
    const refreshToken = jwt.sign(
        {},
        SECRET_KEY,
        {expiresIn : '7d'}
    )
    return refreshToken
}

const validateAccessToken = (accessToken) => {
    try {
      jwt.verify(accessToken, SECRET_KEY); // JWT를 검증합니다.
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Refresh Token을 검증합니다.
  const validateRefreshToken = (refreshToken)  => {
    try {
      jwt.verify(refreshToken, SECRET_KEY); // JWT를 검증합니다.
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Access Token의 Payload를 가져옵니다.
  const getAccessTokenPayload = (accessToken) => {
    try {
      const payload = jwt.verify(accessToken, SECRET_KEY);
      console.log(payload) // JWT에서 Payload를 가져옵니다.
      return payload;
    } catch (error) {
      return null;
    }
  }
export {router as cookieRouter}