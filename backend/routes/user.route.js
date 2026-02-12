const express = require("express")
const userRouter = express.Router()

const {userSignup, userLogin, Verifyemail, VerifyToken} = require("../controller/user.controller")



userRouter.post("/signup", userSignup)
userRouter.post("/login", userLogin)
userRouter.post("/verifymail", Verifyemail)
userRouter.get("/verifytoken", VerifyToken)

module.exports = userRouter