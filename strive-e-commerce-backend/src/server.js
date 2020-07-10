const express = require("express");
const { join } = require("path");
const listEndPoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const productRoutes = require("./services/products/index");
const cartRoutes = require("./services/cart/index");
const sumRoutes = require("./services/products/sumRoute");
const Review = require("./services/reviews");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const server = express();
const port = process.env.PORT;
const APIDocuments = YAML.load(join(__dirname, "./apiDocumentation.yml"));
server.use("/documentation", swaggerUI.serve, swaggerUI.setup(APIDocuments));
server.use(express.json())
server.use("/products", productRoutes);
server.use("/reviews", Review);
server.use("/cart", cartRoutes);
server.use("/product", sumRoutes);
console.log(listEndPoints(server));
mongoose
  .connect("mongodb://localhost:27017/E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`Server is running successfully on ${port}`);
    })
  );
