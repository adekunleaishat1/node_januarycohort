const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
 const Emailverificationmail = require("../utils/emailverification")
 const getnewOtp = require("../utils/otp-generator")
 const jwt = require("jsonwebtoken")

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
       const verificationCode = await getnewOtp()
    const newUser = await usermodel.create({
      username,
      email,
      password:hashedPassword,
      otp:verificationCode
    })
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
       if (!existUser.verified) {
         return res.status(400).json({message:"email is not verified, please check your mail.", status:false})
       }
       const token = await jwt.sign({email},"secretkey",{expiresIn:60})
      return res.status(200).json({message:"Login successful", token, status:true})
      
     }
      return res.status(405).json({message:"Invalid credential", status:false})
     
   } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message})
    
   }
}

const Verifyemail = async(req, res) =>{
  try {
    const {otp} = req.body
   const otpseen = await usermodel.findOne({otp})
   if (!otpseen) {
    return res.status(400).json({message:"Invalid otp"})
   }
   const verfiedUser = await usermodel.findOneAndUpdate(
      {email:otpseen.email},
      {$set:{verified: true}},
      {$unset:{otp}}
    )
    if (verfiedUser) {
        return res.status(200).json({message:"email verification successful"})
      
    }
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const VerifyToken = async(req, res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
   const verifiedToken =  await jwt.verify(token,"secretkey")
   console.log(verifiedToken);
   if (verifiedToken) {
        return res.status(200).json({message:"token verified successfully"})
    
   }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message})
    
  }
}

module.exports = {userSignup, userLogin, Verifyemail, VerifyToken}