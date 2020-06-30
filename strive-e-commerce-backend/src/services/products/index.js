const express = require("express")
const {check} = require("express-validator")
const uniqid = require("uniqid")
const {getProducts, postProducts} = require('../../lib')

const productRouter = express.Router()

productRouter.get('/', async (req,res,next) => {
    const products = await getProducts()
    res.send(products)
})
productRouter.get('/:id', async (req,res,next) => {
    const products = await getProducts()
    const singleProduct = products.filter(product => product.id === req.params.id)
    res.send(singleProduct)
})
productRouter.post('/', [check("name").exists().withMessage("name is required")], async (req,res,next) => {
    try {
        
        const newProduct = {...req.body , id:uniqid(), createdAt:new Date(), updatedAt: new Date()}
         const productsDB = await getProducts()
         productsDB.push(newProduct)
         await postProducts(productsDB)
         res.send(productsDB)
    } catch (error) {
      console.log(error)
    }
})
productRouter.put('/:id', [check("name").exists().withMessage("name is required")], async (req,res,next) => {
     const productsDB = await getProducts()
     const productFound = productsDB.find(product => product.id === req.params.id)
     if(product){
         const position = product.indexOf(productFound)
         const body = req.body
         delete body.createdAt
         delete body.updatedAt
         delete body.id
         const updatedProduct = [...productFound , ...body]
         product[position] = updatedProduct
         await postProducts(productsDB)
     }
 })

 productRouter.delete('/:id')
module.exports = productRouter