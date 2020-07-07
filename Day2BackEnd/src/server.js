const express = require("express")
const mongoose = require("mongoose")
const studentsRoutes = require("./services/students")
const cors = require("cors")
const server = express()
server.use(cors())
server.use(express.json())
server.use("/students" , studentsRoutes)

mongoose.connect("mongodb://localhost:27017/Students-Portfolio",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    server.listen(4000,() => 
        console.log('Server is running perfectly')
    )
)