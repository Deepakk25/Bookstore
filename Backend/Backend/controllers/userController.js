const User=require("../models/userModel")
const { v4: uuidv4 } = require('uuid');//retriving data ,if mongoose id->hack
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.createUserProducts = async (req,res) =>{
    const {name,email,password}= req.body;
    const user= new User({
        id:uuidv4(),
        name,
        email,
        password
        
    })
    await user.save()
    res.status(200).json("user created successfully")
}


// exports.getUser = async (req,res) =>{
//     try{
//         const user = await User.find()
//         res.send(user)
//     }
//     catch(err){
//         console.error(err);
//     }   
// }

exports.login=async(req,res)=>{
    const{email,password}=req.body;
    // req ->email,pass
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json("Invalid Email or Password")
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json("Invalid Email or Password")
        }

        const token=jwt.sign({user_id:user._id},"secret_token",{expiresIn:"8hr",})

        return res.status(200).json( { user: user, token:token});

    }    catch(err){
            console.error(err)
        }
    }
