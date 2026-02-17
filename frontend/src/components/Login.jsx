import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
      const [userDetail, setUserdetails] = useState({
            email:"",
            password:""
        })
        const [isloading, setisloading] = useState(false)
        const navigate = useNavigate()
    const Registeruser = async ()  =>{
        setisloading(true)
        fetch("http://localhost:8004/user/login",{
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(userDetail)
        })
        .then((res)=> res.json())
        .then((data)=> {
            setisloading(false)
            console.log(data)
            localStorage.setItem("token", data.token)
            navigate("/dashboard")
            
        })
        .catch((err)=>{
            setisloading(false)
            console.log(err)
        }
        )
     }
  return (
    <div>
        <input onChange={(e)=> setUserdetails({...userDetail, email:e.target.value})}  type="text" placeholder='Email' />
        <input onChange={(e)=> setUserdetails({...userDetail, password:e.target.value})} type="text" placeholder='Password' />
        <button disabled={isloading} onClick={Registeruser}>{isloading ? "Loading..." : "Register"}</button>
    </div>
  )
}

export default Login