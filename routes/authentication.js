const {Router}=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const secret=process.env.jwt_secret;
const authRouter=Router();
const{userModel,todoModel}=require("../db")


authRouter.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body;
    const hashedPassword= bcrypt.hash(password,10);
        
    
    console.log(hashedPassword)
    try{
    await userModel.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    
}catch(e){
    console.log("error at create",e);
    
}
res.json({
    msg:"user sucessfully signedup"
})
})

authRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body
    console.log(secret)
    try{
    const user=await userModel.findOne({
        email
    })

    const hpass= await bcrypt.compare(password,user.password);
    if(user&&hpass){
        const token=jwt.sign({id:user._id},secret)
    res.json({
        
        token
    })}else{
        res.json({
            msg:"signin faled"

        })
    }
}catch(e){
    console.log(e)
}
})

module.exports={
    authRouter:authRouter
}