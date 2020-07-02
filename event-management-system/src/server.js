const express = require("express")
const cors = require("cors")
const eventsRoutes = require('./services/events')
const server = express()

const port = process.env.port
server.use(express.json())
server.use('/events' , eventsRoutes)
server.listen(port , () => {
    console.log(`Server is running perfectly on ${port}`)
})
