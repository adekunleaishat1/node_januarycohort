
import React,{useState, useEffect} from 'react'
import { Navigate,Outlet } from 'react-router-dom'


// const getuser =async () =>{
//      const token = localStorage.getItem("token")  
//   const response = await  fetch("http://localhost:8004/user/verifytoken",{
//             method:"GET",
//             headers:{
//              "Authorization": `bearer ${token}`,
//               "content-type":"application/json"
//             },
//         })

//       const data =  await response.json()
//       return data
// }

const Protectedroute = () => {
 const user = JSON.parse(localStorage.getItem("current-user"))
const token = localStorage.getItem("token")  
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
             if (data.user) {
               localStorage.setItem("current-user",JSON.stringify(data.user) )
            }
        })
        .catch((err)=>{    
            console.log(err)
        }
        )
       
    }, [])
   
    // console.log(currentuser, "this is the current user");

         if (!token) {
         return <Navigate to={"/login"}/>
         }

  return (
    <div><Outlet/></div>
  )
}

export default Protectedroute