const express = require("express")

const productroute = express.Router()

const {AddProduct, Getallproduct} = require("../controller/product.controller")

productroute.post("/addproduct", AddProduct)
productroute.get("/getproduct", Getallproduct)


module.exports = productroute