const express = require("express")
const {getProducts, getReviews,postReviews} = require('../../lib')

const reviewRouter = express.Router()

// reviewRouter.get('/sum',  async (req,res,next)=>{
//     const productsDB = await getProducts()
//     res.send(productsDB)
// console.log("sum")
// })

module.exports = reviewRouter