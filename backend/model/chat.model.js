const mongoose = require('mongoose')
const { ref } = require('process')

const chatSchema = mongoose.Schema({
    sender: {type: mongoose.Schema.ObjectId, ref:"user_collection", required: true},
    message: {required: true, trim: true, type: String}
})

const chatModel = mongoose.model("chat-collection", chatSchema)

module.exports = chatModel