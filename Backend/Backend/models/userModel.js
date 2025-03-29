const mongoose = require('mongoose')
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema({
   
    name:String,
    email:String,
    password:String,

})


userSchema.pre('save',async function(next){
    
    try {
        if(!this.isModified('password')) return next();
        //modified -> true
        // false!=true

        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashPassword = await bcrypt.hash(user.password,salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        throw error;
    }
}
)


const user=new mongoose.model('user',userSchema)
module.exports=user;