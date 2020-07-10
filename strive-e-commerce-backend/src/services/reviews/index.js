const express = require("express")
const reviewSchema = require("./schema")
const routes = express.Router()

routes.get("/" , async (req,res,next)=>{
    try {
        const reviews = await reviewSchema.find({})
        res.send(reviews)
    } catch (error) {
       console.log(error) 
    }
} )
routes.get("/:productId" , async(req,res,next)=>{
    try {
        const reviewFound = await reviewSchema.findById(req.params.productId)
        res.send(reviewFound)
    } catch (error) {
        console.log(error)
    }   
})

routes.post("/:productId" , async(req,res,next)=>{
    try {
        const review = {...req.body , productId : req.params.productId}
        const newReviewPost = new reviewSchema(review)
        await newReviewPost.save()
        res.send(newReviewPost)
    } catch (error) {
        console.log(error)
    }
} )

routes.put("/:id" ,async(req,res,next)=>{
    try {
        const editReview = await reviewSchema.findByIdAndUpdate(req.params.id,req.body)
        res.send(req.body)
    } catch (error) {
        console.log(error)
    }
} )
routes.delete("/:id" ,async(req,res,next)=>{
    try {
        const deleteReview = await reviewSchema.findByIdAndDelete(req.params.id)
        res.send("Deleted")
    } catch (error) {
        
    }
    
} )


module.exports = routes