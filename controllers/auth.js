import 'dotenv/config.js'
import user from "../model/user.js";
import  Jwt  from "jsonwebtoken";

//-------------------------------------------------------------------------REGISTER-----------------------------------------------------------------------------------------
const register = async (req, res)=>{
    let {name, email, username, password} = req.body;

    try {
        const isEmailExist = await user.findOne({email: email});
        const isUserNameExist = await user.findOne({username: username});

        if(isEmailExist || isUserNameExist){
            return res.status(400).json({error:'This fields already exist'});
        }

        const newUser = new user({
            name,
            email,
            username,
            password
        }) 

        const userCreated = await newUser.save();
        console.log(userCreated);
        res.json({error: null,
        msg:'registred succesfully'
        });

    } catch (error) {
        res.status(500).json('Problem with server to register');
    }    
}

// ---------------------------------------------------------------------------------------------------LOGIN-----------------------------------------------------------------------
    const login = async (req,res)=>{
        let {email, password} = req.body;
        
        try {
            const matchEmail = await user.findOne({email});
            
            if(!matchEmail){
                console.log('email fail');
                return res.status(400).json({error: 'Email not exist'});
            }
            
            if(matchEmail.password !== password){
                return res.status(400).json({error:'Password incorrect'});
            }
            
            const {_id} = matchEmail;
            
            console.log(_id)
            
// ***********************************************GENERATE TOKEN****************************************************************************************
            const accessToken = Jwt.sign({
                id: _id
            },
            process.env.SECRET_TOKEN,
            {expiresIn: '5m'});
            
            // res.json('Access successfully')
            res.set('Authorization', accessToken).json({
                error: null,
                token: accessToken,
                id: _id,
                msg: 'Access successfully'
            })
         

        } catch (error) {
            res.status(500).json('Error in login')
        }
    }

export default {
    register,
    login
};
