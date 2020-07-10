const express = require("express")
const productsSchema = require("./schema")
const productModel = require("./schema")
const q2m = require("query-to-mongo")
const routes = express.Router()

routes.get("/" , async (req,res,next)=>{
    try {
        const products = await productModel.find({})
        res.send(products)
    } catch (error) {
       console.log(error) 
    }
} )
routes.get("/:id" , async(req,res,next)=>{
    try {
        const productFound = await productModel.findById(req.params.id)
        res.send(productFound)
    } catch (error) {
        console.log(error)
    }   
})

routes.post("/" , async(req,res,next)=>{
    try {
        const newProductPost = new productsSchema(req.body)
        await newProductPost.save()
        res.send(newProductPost)
    } catch (error) {
        console.log(error)
    }
} )

routes.put("/:id" ,async(req,res,next)=>{
    try {
        const editProduct = await productsSchema.findByIdAndUpdate(req.params.id,req.body)
        res.send(req.body)
    } catch (error) {
        console.log(error)
    }
} )
routes.delete("/:id" ,async(req,res,next)=>{
    try {
        const deleteProduct = await productsSchema.findByIdAndDelete(req.params.id)
        res.send("Deleted")
    } catch (error) {
        
    }  
})

routes.get("/filter", async (req,res,next)=>{
    try {
        const query = q2m(req.query)
        const products = await productsSchema.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
      .limit(query.options.limit)
      res.send({data:products})
    } catch (error) {
        console.log(error)
    }
})

routes.post("/:id/add-to-cart/:productId", async (req, res, next) => {
    try {
      const product = await productModel.findProduct(req.params.productId)
      if (product) {
        const newProduct = { ...product, quantity: 1 }
        const productAvailableInCart = await productModel.findProductInCart(
          req.params.id,
          req.params.productId
        )
        if (productAvailableInCart) {
          await productModel.increaseQuantity(
            req.params.id,
            req.params.productId,
            1
          )
          res.send("Increased Quantity by 1")
        } else {
          await productModel.addProductToCart(req.params.id, newProduct)
          res.send(newProduct)
        }
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      next(error)
    }
  })

  routes.get("/:id/calculate-cart-total", async (req, res, next) => {
    try {
      const total = await productModel.calculateCartTotal(req.params.id)
      res.send({ total })
    } catch (error) {
      next(error)
    }
  })


module.exports = routes