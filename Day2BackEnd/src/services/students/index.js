const express = require("express") 
const fs = require("fs") 
const path = require("path")
const uniqid = require("uniqid") 
const { request } = require("http")
const router = express.Router()
const studentFilePath = path.join(__dirname ,"students.json")

router.get("/" , (req,res) => {
    const studentFileContentAsBuffer = fs.readFileSync(studentFilePath)
    const studentFileContentAsString = studentFileContentAsBuffer.toString()
    console.log(studentFileContentAsString)
    res.send(JSON.parse(studentFileContentAsString))
})

router.get("/:id", (request, res) => {
    const studentFileContentAsBuffer = fs.readFileSync(studentFilePath)
    const studentsArray = JSON.parse(studentFileContentAsBuffer.toString())
    console.log('id',request.params.id)
    const student = studentsArray.filter((student) => parseInt(student.id) === parseInt(request.params.id))
    console.log(student)
    res.send(student)
})

router.post("/" , (request,res) => {
   const newStudent = {...request.body , id:uniqid()}
   const studentFileContentAsBuffer = fs.readFileSync(studentFilePath)
   const studentsArray = JSON.parse(studentFileContentAsBuffer.toString())
   studentsArray.push(newStudent)
   fs.writeFileSync(studentFilePath , JSON.stringify(studentsArray))
   res.send(newStudent)
})

router.put("/:id" , (request,res)=>{
    const studentFileContentAsBuffer = fs.readFileSync(studentFilePath)
    const studentsArray = JSON.parse(studentFileContentAsBuffer.toString())
    const filteredStudent = studentsArray.filter((student) => student.id != request.param.id)
    const student = request.body
    student.id = request.params.id
    filteredStudent.push(student)
    fs.writeFileSync(studentFilePath , JSON.stringify(filteredStudent))
    res.send(student)
})

router.delete("/:id" ,(request,res)=>{
    const studentFileContentAsBuffer = fs.readFileSync(studentFilePath)
    const studentsArray = JSON.parse(studentFileContentAsBuffer.toString())
    const filteredStudent = studentsArray.filter((student) => student.id !== request.params.id)
    fs.writeFileSync(studentFilePath , JSON.stringify(filteredStudent))
    res.send(filteredStudent)

})
module.exports = router