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
    const user=await userModel.findOne({
        email
    })
    const hpass= await bcrypt.compare(password,user.password);
    if(user&&hpass){
    res.json({
        msg:"signin endpoint called"
    })}else{
        res.json({
            msg:"not signed"

        })
    }
})

module.exports={
    authRouter:authRouter
}