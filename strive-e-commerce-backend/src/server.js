const express = require("express")
const listEndPoints = require("express-list-endpoints")
const productRoutes = require('./services/products')
const server = express()

const port = process.env.PORT
server.use("/products",productRoutes)
console.log(listEndPoints(server))
server.listen(port , () => {
    console.log(`Server is running successfully on ${port}`)
})