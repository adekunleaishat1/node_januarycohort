import React ,{useState}from 'react'
import axios from 'axios'

const Signup = () => {
    const [userDetail, setUserdetails] = useState({
        username:"",
        email:"",
        password:""
    })
     const Registeruser = async ()  =>{
        fetch("http://localhost:8004/user/signup",{
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(userDetail)
        })
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        }
        )
    //    try {
    //      console.log(userDetail);
    //      axios.post("http://localhost:8004/user/signup",userDetail)
    //      .then((res)=>{
    //         console.log(res);
            
    //      }).catch((err)=>{
    //         console.log(err);
            
    //      })
          
    //    } catch (error) {
    //     console.log(error);
        
    //    }
     }
  return (
    <div>
        <input onChange={(e)=> setUserdetails({...userDetail, username:e.target.value})} type="text" placeholder='Username' />
        <input onChange={(e)=> setUserdetails({...userDetail, email:e.target.value})}  type="text" placeholder='Email' />
        <input onChange={(e)=> setUserdetails({...userDetail, password:e.target.value})} type="text" placeholder='Password' />
        <button onClick={Registeruser}>Register</button>
    </div>
  )
}

export default Signup