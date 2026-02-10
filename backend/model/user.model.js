const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{type:String,trim:true, required:true},
    email:{type:String, trim:true, unique:true, required:true},
    password:{type:String, trim:true, required:true},
    profilePicture:{type:String, trim:true},
    verified:{type:Boolean, default:false}
},{timestamps:true})

const userModel = mongoose.model("user_collection", userSchema)

module.exports = userModel