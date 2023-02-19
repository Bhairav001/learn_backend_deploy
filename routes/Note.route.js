const express = require("express")
const { NoteModel } = require("../model/Note.model")

const noteRouter = express.Router()




noteRouter.get("/",async(req,res)=>{
    let query=req.query;
    try {    
        const note = await NoteModel.find(query)
        res.send(note)
        // res.send("All the routes")
    } catch (error) {
        console.log(error.message)
    }
})


noteRouter.post("/create",async(req,res)=>{
    const payload= req.body;
    try {
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("Created the note")
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
   
})



noteRouter.patch("/update/:id",async(req,res)=>{
    const payload= req.body;
    const id = req.params.id;
    const note = await NoteModel.findOne({"_id":id});
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})


noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const note = await NoteModel.findOne({"_id":id});
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})






module.exports={
    noteRouter
}