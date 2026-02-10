const otpGenerator = require("otp-generator")

const getnewOtp = async() =>{
 const otp = await otpGenerator.generate(4, 
    {digits:true, upperCaseAlphabets: false, specialChars: false }
  );
  return otp;
}

module.exports = getnewOtp