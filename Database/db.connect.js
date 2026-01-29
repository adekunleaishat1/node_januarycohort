const mongoose = require("mongoose")


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

module.exports = connect
