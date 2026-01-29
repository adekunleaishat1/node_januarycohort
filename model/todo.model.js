const mongoose = require("mongoose")

const todoschema = new mongoose.Schema({
  title:{type:String, required:true, trim:true},
  description:{type:String, required:true, trim:true},
  completed:{type:Boolean, default:false}
})

const todomodel = mongoose.model("todo_collection", todoschema)

module.exports = todomodel