import React ,{useState, useEffect} from 'react'

const Chat = ({socketref}) => {
    const user = JSON.parse(localStorage.getItem("current-user"))
    console.log(user);
    
    const [message, setMessage] = useState("")
    const [allmessage, setallmessage] = useState([])
    const socket = socketref.current
    const sendMessage = () =>{
        
        let chat = {
            message,
            sender:user._id
        }
        console.log(chat);
        socket.emit("Sendmessage",chat)
    }

    socket.on("receivemessage",(message)=>{

      setallmessage([...allmessage, message])
    })

    useEffect(() => {
     socket.on("sendallmessage",(message)=>{
        console.log(message);
        
      setallmessage(message)
    })
    }, [])
    
  return (
    <div>
       <input onChange={(e)=>setMessage(e.target.value)} type="text" />
       <button onClick={sendMessage}>Send Message</button>
       <div>
         {allmessage.map((message)=>(
            <>
            <h1 style={{color:"white"}}>{message.message}</h1>
            </>
         ))}
       </div>
    </div>
  )
}

export default Chat