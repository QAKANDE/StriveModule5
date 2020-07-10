const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const productModel = require("../products/schema")


const ProductCartSchema = new Schema({
    quantity: {type:Number},
    "productId":{type:String , required:true},
    "name":{type:String , required:true},
    "description":{type:String , required:true},
    "brand":{type:String , required:true},
    "imageUrl":{type:String , required:true},
    "price":{type:Number , required:true},
    "category":{type:String , required:true},
  })
  ProductCartSchema.static("findProduct", async function (productId) {
    const productFound = await productModel.findById(productId)
    return productFound
  })

ProductCartSchema.static("findProductInCart", async function (productId) {
    const productAvailable = await cartModel.findById(productId)
    return productAvailable
  })
  ProductCartSchema.static("increaseQuantity", async function (productId,quantity) {
    await cartModel.findOneAndUpdate(
      {
        _id: productId
      },
      { $inc: { "productCartSchema.$.quantity": quantity } }
    )
  })
  
  ProductCartSchema.static("addProductToCart", async function (productId, product) {
    await ProductCartSchema.findOneAndUpdate(
      { _id: productId },
      {
        $addToSet: { productCartSchema: product },
      }
    )
  })
  
  ProductCartSchema.static("removeProductFromCart", async function (id, bookId) {
    await productModel.findByIdAndUpdate(id, {
      $pull: { cart: { _id: bookId } },
    })
  })
  
  ProductCartSchema.static("calculateCartTotal", async function (productId) {
    const { cart } = await productCartSchema.findById(productId)
    return cart
      .map((product) => product.price * product.quantity)
      .reduce((acc, el) => acc + el, 0)
  })
  const cartModel = mongoose.model("carts" , ProductCartSchema)
  module.exports = cartModel