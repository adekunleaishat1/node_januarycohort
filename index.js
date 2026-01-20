const express = require("express")
const app = express()
const mongoose = require("mongoose")


app.set("view engine", "ejs")
app.use(express.urlencoded())

// CRUD 

const userSchema = new mongoose.Schema({
  username:{type:String, required:true, trim:true},
  email:{type:String, unique:true, required:true, trim:true},
  password:{type:String, required:true}
})

const usermodel = mongoose.model("user_collection", userSchema)

const users =[]
const name = "Shola"
 let currUser  =  ""
const alluser =[
        {"name":"OLaide", "class":"NodeJS"},
        {"name":"Lanre", "class":"ReactJS"},
        {"name":"Kareem", "class":"AngularJS"},
        {"name":"Olamide", "class":"NodeJS"},
        {"name":"Titilayo", "class":"ReactJS"},
        {"name":"Ayomide", "class":"VueJS"},
        {"name":"Fredick", "class":"AngularJS"},
        {"name":"Evans", "class":"NodeJS"},
        {"name":"Temi", "class":"ReactJS"},
        {"name":"Anu", "class":"VueJS"},
        {"name":"Kenny", "class":"AngularJS"},
        {"name":"Hammed", "class":"NodeJS"},
        {"name":"Quadri", "class":"ReactJS"},
        {"name":"Richard", "class":"VueJS"},
    ]



app.get("/",(req, res)=>{
  res.send("Welcome to your node class")
})

app.get("/user",(req, res)=>{
  res.json({
    "user": alluser
  })
})

app.get("/user/:id",(req, res)=>{
      console.log(req.params);
      const {id} = req.params
      const oneuser = alluser[id]
      console.log(oneuser);
      res.send(oneuser)
})

app.get("/home",(req, res)=>{
  res.render("index",{name,alluser, gender:"Male"})
})

app.get("/signup",(req, res)=>{
  res.render("signup")
})


app.post("/user/signup", async(req, res)=>{
  try {
    console.log(req.body);
  const newuser = await  usermodel.create(req.body)    
   console.log(newuser);
   if (newuser) {
    return res.redirect("/login")
   }
   return res.send("error occured")
  } catch (error) {
    console.log(error.message);
    if (error.code == 11000) {
      return res.send("user already exist")
    }
    if (error.message.includes("user_collection validation failed")) {
      return res.send("All fields are mandatory")
    }
  }
})

app.get("/login", (req, res)=>{
  res.render("login")
})

app.get("/dashboard", (req, res)=>{
  if (currUser) {
   return res.render("dashboard",{name:currUser})
  }
   return res.redirect("/login")
})


app.post("/userLogin", (req, res) => {
  const details = req.body
  console.log(details);
  
 const search = users.find(member => {
    return details.email === member.email && details.password === member.password
  })

  console.log(search , "correct user");
  

  if (search) {
    currUser = search.username
   res.redirect("/dashboard")
  } else {
    res.send("Invalid credentials")
  }
})


const URI = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/january2026?appName=Cluster0"


const connect = async() =>{
   try {
    
   const connection = await mongoose.connect(URI)
  //  console.log(connection, "datbase connection result");
   if (connection) {
    console.log("database connected successfully");
    
   }

   } catch (error) {
    console.log(error);
    
   }
}
connect()



const port = 8004
app.listen(port,()=>{
console.log(`Server is running on port ${port}`)
})

// const username = "Shla"

// console.log(username, "show the value of username");

// let alluser = ["Shola", "John", "Doe"]
// console.log(alluser, "All user informtion");

// alluser.push("Smith")


// console.log(alluser, "All user informtion");
