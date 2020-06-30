const {readFromDB,writeToDB} = require('./utilities')
const path = require("path")
const productPath = path.join(__dirname,'../services/data/product.json')
const reviewPath = path.join(__dirname,'../services/data/review.json')
module.exports = {
    getProducts : async () => readFromDB(productPath),
    postProducts : async (data) => writeToDB(productPath,data),
    getReviews : async () => readFromDB(reviewPath),
    postReviews : async (data) => writeToDB(reviewPath,data),
}
