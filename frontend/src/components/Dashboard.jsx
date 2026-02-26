
import React,{ useState} from 'react'


const Dashboard = () => {
    const token = localStorage.getItem("token")
    console.log(token);

    const [profilepicture , setprofilepicture] = useState("")
    
    
    const Handlefilechange = (e) =>{
      const imagefile =  e.target.files[0]
      console.log(imagefile);
       const reader = new FileReader()
       reader.onload = (e) =>{
        console.log(e.target.result);
        if (e.target.result) {
             setprofilepicture(e.target.result)
        }
         
       }
       reader.readAsDataURL(imagefile)
    
    }

    const Uploadprofile = async() =>{
     try {
        const res =  await  fetch("http://localhost:8004/user/profile/update",{
            method:"PATCH",
            headers:{
             "Authorization": `bearer ${token}`,
              "content-type":"application/json"
            },
            body:JSON.stringify({profilepicture})
        })

      const data =  await res.json()
      console.log(data);
      
     } catch (error) {
        console.log(error);   
     }
    
    }
  return (
    <div>
        Welcome To your dashboard
        <input onChange={Handlefilechange} type="file" />
        <button onClick={Uploadprofile}>Uploadprofile</button>
    </div>
  )
}

export default Dashboard