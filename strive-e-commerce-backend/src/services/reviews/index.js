const express = require("express")
const {getProducts, getReviews,postReviews} = require('../../lib')

const reviewRouter = express.Router()

reviewRouter.post('/:id',  async (req,res,next)=>{
    const productsDB = await getProducts()
    const productFound = productsDB.find(product => product.id === req.body.id)
})

module.exports = reviewRouter