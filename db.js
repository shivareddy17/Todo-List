const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userSchema= new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

const todoSchema=new Schema({
    todo:String,
    done:Boolean
})


const userModel =new mongoose.model("user",userSchema);
const todoModel =new mongoose.model("todo",todoSchema);

module.exports ={
    userModel:userModel,
    todoModel:todoModel
}