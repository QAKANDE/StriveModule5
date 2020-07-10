const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const productsSchema = new Schema({
    "name":{type:String , required:true},
    "description":{type:String , required:true},
    "brand":{type:String , required:true},
    "imageUrl":{type:String , required:true},
    "price":{type:Number , required:true},
    "category":{type:String , required:true},
    "createdAt":{type:Date},
    "updatedAt":{type:Date},
})
productsSchema.pre('save', function(next) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    next();
  });
 const productModel = mongoose.model("Products" , productsSchema)
module.exports = productModel