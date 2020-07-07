const express = require("express")
const studentSchema = require('./schema')
const uniqid = require("uniqid")
const routes = express.Router()

routes.get("/" , async (req,res,next)=>{
    try {
        const students = await studentSchema.find({})
        res.send(students)
    } catch (error) {
       console.log(error) 
    }
} )
routes.get("/:id" , async(req,res,next)=>{
    try {
        const studentFound = await studentSchema.findById(req.params.id)
        res.send(studentFound)
    } catch (error) {
        console.log(error)
    }   
})

routes.post("/" , async(req,res,next)=>{
    try {
        const newStudentPost = new studentSchema(req.body)
        await newStudentPost.save()
        res.send(newStudentPost)
    } catch (error) {
        console.log(error)
    }
} )

routes.put("/:id" ,async(req,res,next)=>{
    try {
        const editStudent = await studentSchema.findByIdAndUpdate(req.params.id,req.body)
        res.send(req.body)
    } catch (error) {
        console.log(error)
    }
} )
routes.delete("/:id" ,async(req,res,next)=>{
    try {
        const deleteStudent = await studentSchema.findByIdAndDelete(req.params.id)
        res.send("Deleted")
    } catch (error) {
        
    }
    
} )


module.exports = routes