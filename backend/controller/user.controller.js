const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
 const Emailverificationmail = require("../utils/emailverification")
 const getnewOtp = require("../utils/otp-generator")
 

const userSignup =  async (req, res) =>{
  try {
    console.log(req.body, "Signup information");
    const {username , email , password}  = req.body
    if (!username || !email || !password) {
      return  res.status(400).json({message:"All fields are mandatory", status:false})
    }
     const existUser  =  await usermodel.findOne({email})
     console.log(existUser , "exist user info");
     
     if (existUser) {
       return res.status(405).json({message:"User already exist", status:false})   
     }
     const hashedPassword = await bcrypt.hash(password, 10)
      console.log(hashedPassword, "hashed password");
      
    const newUser = await usermodel.create({
      username,
      email,
      password:hashedPassword
    })
    const verificationCode = await getnewOtp()
     const mailer = await Emailverificationmail({email,verificationCode, username})
    if (newUser && mailer == "mail sent") {
      return res.status(200).json({message:"User registerd successfully"})   
    }
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const userLogin = async(req, res) =>{
   try {
    const {email , password} = req.body
    if (!email || !password) {
      return res.status(400).json({message:"All fields are mandatory", status:false})
    }
     const existUser =  await usermodel.findOne({email})
     console.log(existUser);
    const correctpassword  =   await bcrypt.compare(password, existUser.password)
    console.log(correctpassword);
    
     if (existUser && correctpassword ) {
      return res.status(200).json({message:"Login successful", status:true})
      
     }
      return res.status(405).json({message:"Invalid credential", status:false})
     
   } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message})
    
   }
}

module.exports = {userSignup, userLogin}