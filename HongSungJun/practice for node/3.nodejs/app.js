const express = require('express');
const jwt = require("jsonwebtoken");
const {Op} = require('sequelize')
const {User} = require('./models')
const bcrypt = require('bcrypt');
require('dotenv').config()
const app = express();
const port = 3000;


const router = express.Router()
app.use('/api',express.json(),router)



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/set-cookie", (req, res) => {
  const expire = new Date();
  expire.setMinutes(expire.getMinutes() + 60); 

  res.writeHead(200, {
    'Set-Cookie': `name=sparta; Expires=${expire.toGMTString()}; HttpOnly; Path=/`,
  });
  return res.status(200).end();
});


app.get("/set-cookie", (req, res) => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); 
  
    res.cookie('name', 'sparta', {
      expires: expires
    });
    return res.status(200).end();
  });

  app.get("/get-cookie", (req, res) => {
    const cookie = req.headers.cookie;
    
    return res.status(200).json({ cookie });
  });


let tokenObject = {}; 

app.get("/set-token/:id", (req, res) => {
  const id = req.params.id;
  const accessToken = createAccessToken(id);
  const refreshToken = createRefreshToken();

  tokenObject[refreshToken] = id; 
  res.cookie('accessToken', accessToken); 
  res.cookie('refreshToken', refreshToken); 

  return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." });
})

app.get("/get-token", (req, res) => {
    const token = req.headers.cookie

    
    const accessToken = token.split(";")[0].replace(' accessToken=',"")
    const refreshToken = token.split(";")[1].replace(' refreshToken=',"")
  
    if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
    if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });
  
    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);
  
    if (!isRefreshTokenValidate) return res.status(419).json({ "message": "Refresh Token이 만료되었습니다." });
  
  
    if (!isAccessTokenValidate) {
      const accessTokenId = tokenObject[refreshToken];
      if (!accessTokenId) return res.status(419).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });
  
      const newAccessToken = createAccessToken(accessTokenId);
      res.cookie('accessToken', newAccessToken);
      return res.json({ "message": "Access Token을 새롭게 발급하였습니다." });
    }
  
    const { id } = getAccessTokenPayload(accessToken);
      return res.json({ "message": `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.` });
  })
  
  
  
  function validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, process.env.SECRETKEY); 
      return true;
    } catch (error) {
      return false;
    }
  }
  
  
  function validateRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, process.env.SECRETKEY); 
      return true;
    } catch (error) {
      return false;
    }
  }
  
  
  function getAccessTokenPayload(accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.SECRETKEY); 
      return payload;
    } catch (error) {
      return null;
    }
  }


function createAccessToken(id) {
  const accessToken = jwt.sign(
    { id: id }, 
    process.env.SECRETKEY, 
    { expiresIn: '10s' }) 

  return accessToken;
}


function createRefreshToken() {
  const refreshToken = jwt.sign(
    {}, 
    process.env.SECRETKEY, 
    { expiresIn: '7d' }) 

  return refreshToken;
}
// ***********회원가입**********************
router.post('/users', async (req,res) => {
  const {email,nickname,password,confirmPassword} = req.body
  console.log(email,nickname,password,confirmPassword)
  if(password !== confirmPassword){
      res.status(400).send({
          errorMessage: "패스워드가 확인란과 다릅니다."
      })
      return
  }

  const existUser = await User.findOne({
      [Op.or]: [{email}, {nickname}]
  })
  if(existUser){
      res.status(400).send({
          errorMessage: "이메일 또는 닉네임이 이미 사용중입니다."
      })
      return
  }

  const hashedPassword = await bcrypt.hash(password,10)
  await User.create({email,nickname,password: hashedPassword})

  res.status(201).send("회원가입에 성공하였습니다.")
})


router.post("/auth", async (req,res) => {
  const {email,password} = req.body

  const user = await User.findOne({
    where: {
      email,
    }
  })
  console.log(user)

  if(!user){
      res.status(400).send({
          errorMessage: "해당 이메일로 된 회원가입정보가 없습니다."
      })
  }

  const isAuth = await bcrypt.compare(password,user.password)

  if(!isAuth){
      res.status(400).send({
          errorMessage: "비밀번호가 틀립니다"
      })
  }
  res.send({
      token : jwt.sign({userId: user.userId},process.env.SECRETKEY)
  })
})
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});