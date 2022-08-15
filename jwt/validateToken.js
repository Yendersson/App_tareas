import 'dotenv/config.js'
import Jwt from "jsonwebtoken";


// Validate Token
const validateToken = (req, res, next) =>{

    const accessToken = req.headers['authorization'];
    if(!accessToken) res.json('access denied');

    Jwt.verify(accessToken, process.env.SECRET_TOKEN, (err, user)=>{
        if(err){
            res.json('access denied, token expired or incorrect');
        }else{
            req.user = user
            next();
        }
    })
}

// Validate token and id users to do change in their profile
const validateTokenAndAuthorization = (req, res, next) => {
    validateToken(req, res, ()=>{
        if(req.user.id === req.params.id){
            console.log('good')/*test*/ 
            next()
        }else{
            res.status(403).json('You are not allowed to do that')
        }
    })
}

export default {
    validateToken,
    validateTokenAndAuthorization
}
