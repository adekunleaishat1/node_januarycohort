const express = require("express")
const app = express()
require("dotenv").config()
const chatModel = require('./model/chat.model')
const connect = require("./Database/db.config")
const userRouter = require("./routes/user.route")
const productroute = require("./routes/product.route")
const cors = require('cors')
const socket = require("socket.io")
let chat;




app.use(cors({origin:"*"}))
app.use(express.json({limit:"50mb"}))
app.use("/user", userRouter)
app.use("/product", productroute)





connect()
const port = 8004
const connection = app.listen(port,()=>{
  console.log(`App started at port ${port}`);
  
})


const io = socket(connection,{
  cors:{origin:"*"}
})

io.on("connection", async(socket)=>{
  console.log("A user connected");
  socket.on("Sendmessage", async (message)=>{
     console.log(message);
      socket.emit("receivemessage", message)
   const newchat =  await chatModel.create(message)
    
  })

  const allchat =  await chatModel.find().populate('sender','email id')
  console.log(allchat);
  socket.emit("sendallmessage",allchat)
})



// const sendMessage = async(req, res) => {
//   try {
//     const sendMessage = await chatModel.create({ message: chat, })
//   } catch (error) {
//     console.log(error);
    
//   }
// }
