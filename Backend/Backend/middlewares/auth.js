const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    if(!req.header("Authorization")){
        return res.status(401).json({error:"No token,authentication Denied"})
    }
    const token=req.header("Authorization").split(" ")[1];
    // array return for split
    // Authorization: bearer kjhkjdhjkhew

    if(!token){
        return res.status(401).json({error:"No token,authentication denied"});

    }
    try{
        const decoded=jwt.verify(token,"secret_token");//user_id:
        // genrated token decode validate
        // userid=req.user
        req.user=decoded;

        next();
    }catch(err){
        res.status(401).json({error:"Token is not valid"});
    }
};
module.exports=auth;