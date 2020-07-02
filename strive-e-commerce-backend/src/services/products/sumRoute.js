const express = require("express")
const {check} = require("express-validator")
const uniqid = require("uniqid")
const {begin} = require("xmlbuilder")
const {xml2js} = require("xml-js")
const {getProducts, postProducts} = require('../../lib')
const axios = require("axios")

const sumRoute = express.Router()

sumRoute.get('/sumPrice', async (req,res,next) => {
    try {
        const {price1,price2} = req.query
        if(price1 & price2){
            const priceRequestXml =  begin({
             version: "1.0",
             encoding: "utf-8",
           }).ele("soap12:Envelope", {
             "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
             "xmlns:xsd":"http://www.w3.org/2001/XMLSchema",
             "xmlns:soap12":"http://www.w3.org/2003/05/soap-envelope"
           }).ele("soap12:Body")
           .ele("Add" ,{
             "xmlns":"http://tempuri.org/"
           }).ele("intA")
           .text(price1)
             .up()
             .ele("intB")
             .text(price2)
             .end()
             const response = await axios({
                 method:"POST",
                 url:"http://www.dneonline.com/calculator.asmx?op=Add",
                 data:priceRequestXml,
                 headers:{"Content-Type": "text/xml"}
             })
             let xmlData = response.data
             const options = { ignoreComment: true, alwaysChildren: true, compact: true }
             const resultInJSON = xml2js(xmlData)
             res.send(resultInJSON)
        }
        else{
            next(new Error("Error code"))
        }
        
    } catch (error) {
        next(error)
    }

})

module.exports=sumRoute