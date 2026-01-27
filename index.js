const { log } = require("console")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

app.set("view engine", "ejs")
app.use(express.urlencoded())

// CRUD 

const userSchema = new mongoose.Schema({
  username:{type:String, required:true, trim:true},
  email:{type:String, unique:true, required:true, trim:true},
  password:{type:String, required:true}
})

const usermodel = mongoose.model("user_collection", userSchema)

const todoschema = new mongoose.Schema({
  title:{type:String, required:true, trim:true},
  description:{type:String, required:true, trim:true},
  completed:{type:Boolean, default:false}
})

const todomodel = mongoose.model("todo_collection", todoschema)

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

app.get("/todo", async(req, res)=>{
  try {
   const alltodo =  await todomodel.find()
   console.log(alltodo, "All todo information.");
     res.render("todo",{alltodo})
  } catch (error) {
    console.log(error);
    
  }
})
app.post("/deletetodo/:id", async(req,res)=>{
try {
 
  const {id} = req.params
   console.log(id);
  const deleteuser =  await todomodel.findByIdAndDelete(id)
  console.log(deleteuser, "deleted todo");
  if (deleteuser) {
    res.redirect("/todo")
  }
} catch (error) {
  console.log("unable to delete user");
  
}

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


app.post("/userLogin", async (req, res) => {
 
  try {
     const {email , password } = req.body
         if (!email || !password) {
      return res.send("Invalid Login Credentials")
     }
     const user = await usermodel.findOne({email})
     
     console.log(user, "Result for query find");
     
     if (!user && user.password !== password) {
      return res.send("Invalid email or password")
     }
 
     currUser = user.email    
      return res.redirect("/dashboard")
    // else { return res.redirect("/dashboard")}
  } catch (error) {
    console.log(error);
    
  }
})

app.post("/addtodo",async (req, res)=>{
  console.log(req.body);
  try {
   const newTodo =  await todomodel.create(req.body)
   if (newTodo) {
    return res.redirect("/todo")
   }
    return res.send("unable to add todo")
  } catch (error) {
    console.log(error);
    
  }
  
})
app.post("/completetodo/:id",async (req,res)=>{
   console.log(req.params);
  
   const {id} = req.params
   const {check} = req.body
  try{
    console.log(check, "check value");
   if (check == "false") {
    const updated =  await todomodel.findByIdAndUpdate(id, 
     {completed:true} 
      )

      res.redirect("/todo")
      
   }else{
     await todomodel.findByIdAndUpdate(id, 
     {completed:false} 
    )
      res.redirect("/todo")
   }
  }catch (error){

  }
})


const URI = process.env.MONGOURI


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
