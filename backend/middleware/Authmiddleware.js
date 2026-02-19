const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

const authMiddleware = async(req, res, next) =>{
  try {
    console.log(req.headers);
    
     const token = req.headers.authorization.split(" ")[1]
     console.log(token);
     
     if (!token) {
      return res.status(400).json({message:"Invalid Token"})   
     }
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRETKEY)
    console.log(verifiedToken);
    
    if (!verifiedToken) {
      return res.status(400).json({message:"jwt malformed"})    
    }
   const user = await userModel.findOne({email:verifiedToken.email})
   req.user = user._id
   next()
  } catch (error) {
      return res.status(500).json({message:error.message})    
  }
}

module.exports = authMiddleware