const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const studentsSchema = new Schema({
    "name":{type:String , required:true},
    "surname":{type:String , required:true},
    "email":{type:String , required:true},
})

module.exports = mongoose.model("students" , studentsSchema)