const express =require("express");
const app=express();
require("dotenv").config();
const {authRouter}=require("./routes/authentication")
const {todoRouter}=require("./routes/todos")
const mongoose=require("mongoose");
app.use(express.json());

app.use("/user",authRouter);
app.use("/todos",todoRouter)

const call=async ()=>{
    await mongoose.connect(process.env.mongo_url);
    app.listen(process.env.port)
    console.log(`listening on port ${process.env.port}`);
    
}
call()


