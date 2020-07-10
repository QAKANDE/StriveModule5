const express = require("express")
const cartModel = require("./schema")
const cartSchema = require("./schema")
const productSchema = require("../products/schema")
const routes = express.Router()

routes.post("/addtocart/:productId" ,async(req,res,next)=>{
    try {     
        const product = await productSchema.findById(req.params.productId)
        const newCart = {...req.body , name: product.name , description:product.description,
        brand:product.brand , imageUrl:product.imageUrl ,price:product.price , category:product.category,
            productId:req.params.productId
    }
        const cart = new cartModel(newCart)
         await cart.save()
         const isProductInCart = await cartSchema.findById(req.params.productId)
         res.send(isProductInCart)
        //  if(isProductInCart){
        //      cartModel.update({$inc: {quantity:1}})
        //      res.send("ok")
        // }
    } catch (error) {
        console.log(error)
    }
})
module.exports = routes