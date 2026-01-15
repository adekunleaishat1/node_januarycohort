const express = require("express")
const app = express()


app.set("view engine", "ejs")
app.use(express.urlencoded())

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


app.post("/user/signup",(req, res)=>{
  //  console.log(req.body);
   users.push(req.body)
   console.log(users, "All registered users");
   res.redirect("/login")
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
