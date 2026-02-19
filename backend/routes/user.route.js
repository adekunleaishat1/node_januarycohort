const express = require("express")
const userRouter = express.Router()

const {userSignup, userLogin, Verifyemail, VerifyToken, profileUpdate} = require("../controller/user.controller")
const authMiddleware = require("../middleware/Authmiddleware")


userRouter.post("/signup", userSignup)
userRouter.post("/login", userLogin)
userRouter.post("/verifymail", Verifyemail)
userRouter.get("/verifytoken", VerifyToken)
userRouter.patch("/profile/update",authMiddleware,profileUpdate)

module.exports = userRouter