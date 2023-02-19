const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/User.route")
const { noteRouter } = require("./routes/Note.route")
const { authenticate } = require("./middlewares/authenticate.middleware")
const cors = require("cors")
const app= express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)









// app.get("/data",(req,res)=>{
//     // const token = req.query.token
//     const token = req.headers.authorization
//     jwt.verify(token, 'masai', function(err, decoded) {
//         if(decoded){
//             res.send({"msg":"Data is there"})
//         }else{
//             res.send({"msg":"Something went wrong","error":err.message})
//         }
//       });

// })



// app.get("/cartproducts",(req,res)=>{
//     const token = req.headers.authorization
//     jwt.verify(token, 'masai', function(err, decoded) {
//         if(decoded){
//             res.send({"msg":"cart is there"})
//         }else{
//             res.send({"msg":"Something went wrong","error":err.message})
//         }
//       });
// })


// app.get("/about",(req,res)=>{
//     res.send("About Page....")
// })


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log("error")
    }
    console.log(`server has started port ${process.env.port}`)
})