const jwt=require("jsonwebtoken");
const secret=process.env.jwt_secret;

function authmidlleware(req,res,next){
const token=req.headers.token;
//console.log(token,secret);
let dId;
try{
dId=jwt.verify(token,secret);
}catch(e){
    console.log(e);
    
}
//console.log(dId.id)
if(dId){
req.id=dId.id
next()
}else{
    res.json({
        msg:"invalid token"
    })
}
}

module.exports={
    authmidlleware:authmidlleware
}