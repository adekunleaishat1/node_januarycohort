const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./Database/db.config")
const userRouter = require("./routes/user.route")
const cors = require('cors')

app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user", userRouter)




connect()
const port = 8004
app.listen(port,()=>{
  console.log(`App started at port ${port}`);
  
})