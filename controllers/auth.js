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
            return res.status(400).json('This fields already exist');
        }

        const newUser = new user({
            name,
            email,
            username,
            password
        }) 

        const userCreated = await newUser.save();
        console.log(userCreated);
        res.json('registred succesfully');

    } catch (error) {
        res.status(500).json('Problem with server to register', error);
    }    
}

// ---------------------------------------------------------------------------------------------------LOGIN-----------------------------------------------------------------------
    const login = async (req,res)=>{
        let {email, password} = req.body;
        
        try {
            const matchEmail = await user.findOne({email});
            
            if(!matchEmail){
                return res.status(400).json('Email not exist');
            }
            
            if(matchEmail.password !== password){
                return res.status(400).json('Password incorrect');
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
            res.header('authorization', accessToken).json({
                token: accessToken,
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
