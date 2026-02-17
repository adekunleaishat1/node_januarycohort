import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const VerifyMail = () => {
    const navigate = useNavigate()
    const [otp, setotp] = useState("")
    const handleinputChange = (e) =>{
     
      let value = e.target.value
     setotp(otp + value)
    }
    const Verifymail = () =>{
        let data = {
            otp
        }
         console.log(data);
        
       fetch("http://localhost:8004/user/verifymail",{
        method:"POST",
         headers:{
              "content-type":"application/json"
         },
        body:JSON.stringify(data)
       }).then((res)=>res.json())
       .then((data)=> {
        console.log(data);
        navigate("/login")
       }).catch((err)=>{
        console.log(err);
        
       })
    }
  return (
    <div>
        <h1>Enter your OTP</h1>
        <div  style={{width:"500px", padding:"10px 20px", display:"flex" , justifyContent:"space-around", alignItems:"center"}}>
        <input onChange={handleinputChange} style={{width:"100%", border:"1px solid white", color:"white"}} type="text" />
        <input onChange={handleinputChange} style={{width:"100%", border:"1px solid white", color:"white"}} type="text" />
        <input onChange={handleinputChange} style={{width:"100%", border:"1px solid white", color:"white"}} type="text" />
        <input onChange={handleinputChange} style={{width:"100%", border:"1px solid white", color:"white"}} type="text" />
        </div>
        <button onClick={Verifymail}>Verify</button>
    </div>
  )
}

export default VerifyMail