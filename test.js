import express from "express"
const app=express()
app.get("/",(req,res)=>{
  res.send("This is ")

})
app.listen(2000,()=>{
  console.log(("This is server"));
  
})