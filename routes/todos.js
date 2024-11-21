const {Router} =require("express");
const {authmidlleware}=require("../authmiddlewares")
const todoRouter=Router();
const {todoModel}=require("../db")
todoRouter.get("/",authmidlleware,async(req,res)=>{
    const id=req.id;
    console.log(id)
    try{
    const todos=await todoModel.find({userId:id})
    res.json({
       
        todos
    })
}catch(e){
    console.log(e)
    res.json({
        msg:"error finding todos"
    })
}
})
todoRouter.post("/addtodo",authmidlleware,async (req,res)=>{
   const id=req.id
   console.log(id)
   const {todo}=req.body
   try{
     const todos=await todoModel.create({
        todo,
        done:false,
        userId:id

     })
     res.json({
        msg:"todo created",
        id:todos._id
     })}catch(e){
        console.log(e)
        res.json({
            msg:"error accoured while creating a todo"
        })
     }
})
todoRouter.put("/:id",authmidlleware,async(req,res)=>{
    const {id}=req.params
    const{todo,done}=req.body;
    console.log(id,todo,done);
    try{
    const course = await todoModel.updateOne({
        _id: id 
        
    }, {
        todo:todo, 
        done:done, 
        
    })
    console.log(course._id)
    res.json({
        message: "Course updated",
        courseId: course._id
    })}catch(e){
        console.log(e)
        res.json({
            msg:"error updating todo"
        })
    }
})
todoRouter.delete("/:id",authmidlleware,async ()=>{
    const id=req.params
    try{
    const deltodo=await todoModel.delete({_id:id})
    if(deltodo){
        res.json({
            msg:"todo sucessfully deleted"
        })
    }else{
        res.json({
            msg:"todo not deleted"
        })
    }
}catch(e){
    console.log(e)
    res.json({
        msg:"todo not deleted"
    })
}
})




module.exports={
    todoRouter:todoRouter
}