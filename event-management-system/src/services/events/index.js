const express = require("express")
const routes = express.Router()
const path = require("path")
const uniqid = require("uniqid")
const {Transform} = require("json2csv")
const {readJSON,writeJSON} = require("fs-extra")
const {createReadStream,createWriteStream} = require("fs")
const pump = require("pump")
const sgMail = require('@sendgrid/mail')
const wkhtmltopdf = require("wkhtmltopdf")
const filePathOnDisk = path.join(__dirname , 'events.json')

const readFile = async (filePath) => {
    const fileJSON = await readJSON(filePath)
    return fileJSON
}

const writeFile = async (filePath, data) => {
    const fileJSON = await writeJSON(filePath,data)
}


routes.get('/attendees' , async (req,res,next)=>{
    const events = await readFile(filePathOnDisk)
    res.send(events)
})
routes.get('/attendees/csv' , async (req,res,next)=>{
    const outputPath = path.join(__dirname , 'event.csv')
    const input = createReadStream(filePathOnDisk)
    const json2csv = new Transform({
        fields: ["id", "firstName", "secondName", "email", "timeOfArrival"],
    })
    const output = createWriteStream(outputPath)
     pump(input,json2csv,output , (err)=>{
         if(err){
             console.log(err)
         }
         else{
             res.send("ok")
         }
     })
})

routes.post('/attendees' , async(req,res,next)=>{
    const newUser = {...req.body , id:uniqid()}
    const eventsDB = await readFile(filePathOnDisk)
    eventsDB.push(newUser)
    console.log(newUser.id)
    await writeFile(filePathOnDisk , eventsDB)
   const pdfFile =  wkhtmltopdf(createReadStream("pdfFile.html", "utf8"), {
        output: 'demo.pdf',
        pageSize: 'letter'
    });
    const publicFolderPath = path.join(__dirname, "./public")
    console.log(publicFolderPath)
    res.send(eventsDB)
})

module.exports = routes