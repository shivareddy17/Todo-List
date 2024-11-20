const {Router} =require("express");

const todoRouter=Router();

todoRouter.get("/",(req,res)=>{
    res.json({
        msg:"todos end point called"
    })
})


module.exports={
    todoRouter:todoRouter
}