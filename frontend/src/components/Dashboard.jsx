import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const token = localStorage.getItem("token")
    console.log(token);
    const navigate = useNavigate()
    
    useEffect(() => {
      fetch("http://localhost:8004/user/verifytoken",{
            method:"GET",
            headers:{
             "Authorization": `bearer ${token}`,
              "content-type":"application/json"
            },
        })
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data)
             if (data.message == 'jwt expired' ) {
                navigate("/login")
            }
        })
        .catch((err)=>{
           
            console.log(err)
        }
        )
    }, [])
    
  return (
    <div>
        Welcome To your dashboard
    </div>
  )
}

export default Dashboard