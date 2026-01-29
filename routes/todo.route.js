 const express = require("express")
 const todorouter = express.Router()
const {gettodoPage,Addtodo} = require("../controller/todo.controller")



todorouter.get("/todo",gettodoPage)
todorouter.post("/addtodo", Addtodo)


module.exports = todorouter