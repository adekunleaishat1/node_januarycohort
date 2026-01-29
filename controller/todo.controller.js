
const todomodel = require("../model/todo.model")



// app.get(, async(req, res)=>{
 
// })
const gettodoPage = async(req, res) =>{
   try {
   const alltodo =  await todomodel.find()
   console.log(alltodo, "All todo information.");
     res.render("todo",{alltodo})
  } catch (error) {
    console.log(error);
    
  }
}

// app.get("/edittodo/:id",async(req,res)=>{
//   console.log(req.params);
//   try {
//     const {id} = req.params
//     const edittodo = await todomodel.findById(id)
//     console.log(edittodo);
    
//     if (edittodo) {
//       res.render("edit",{todo:edittodo})
//     }else{
//       res.send("Error in finding id")
//     }
//   } catch (error) {
//     console.log(err.message);
    
//   }
// })

// app.post("/deletetodo/:id", async(req,res)=>{
// try {
 
//   const {id} = req.params
//    console.log(id);
//   const deleteuser =  await todomodel.findByIdAndDelete(id)
//   console.log(deleteuser, "deleted todo");
//   if (deleteuser) {
//     res.redirect("/todo")
//   }
// } catch (error) {
//   console.log("unable to delete user");
  
// }

// })

// app.post(,async (req, res)=>{
  
  
// })
const Addtodo = async(req, res) =>{
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
}



// app.post("/completetodo/:id",async (req,res)=>{
//    console.log(req.params);
  
//    const {id} = req.params
//    const {check} = req.body
//   try{
//     console.log(check, "check value");
//    if (check == "false") {
//     const updated =  await todomodel.findByIdAndUpdate(id, 
//      {completed:true} 
//       )

//       res.redirect("/todo")
      
//    }else{
//      await todomodel.findByIdAndUpdate(id, 
//      {completed:false} 
//     )
//       res.redirect("/todo")
//    }
//   }catch (error){

//   }
// })



// app.post("/updatetodo/:id",async(req,res)=>{
//   console.log(req.params);
//   try {
//     const {id} = req.params
//     const {title, description} = req.body
//     const updateTodo = await todomodel.findByIdAndUpdate(id, {title:title, description:description, completed:true})
//     if (updateTodo) {
//       res.redirect("/todo")
//     } else{
//       res.send("Changes was not able to be made, try again")
//     }
//   } catch (error) {
//     console.log(err.message);
    
//   }
// })



module.exports = {gettodoPage,Addtodo}