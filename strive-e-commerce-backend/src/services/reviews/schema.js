const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const reviewSchema = new Schema({
  "productId":{type:String, required:true},
    "comment":{type:String , required:true},
    "rate":{type:Number ,
        max:[5,"Please enter a value between 1 and 5"],
         required:true},
    "createdAt":{type:Date},
})
reviewSchema.pre('save', function(next) {
    this.createdAt = Date.now();
    next();
  });

reviewSchema.pre('save', function(next) {
    this.createdAt = Date.now();
    next();
  });

module.exports = mongoose.model("Reviews" , reviewSchema)