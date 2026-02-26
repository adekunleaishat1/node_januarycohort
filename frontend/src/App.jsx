import React, {useRef} from 'react'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import VerifyMail from './components/VerifyMail'
import Dashboard from './components/Dashboard'
import socketClient from "socket.io-client"
import Chat from './components/Chat'
import Protectedroute from './Protectedroute'
const App = () => {
  const Baseurl ="http://localhost:8004"
  const socketref = useRef(socketClient(Baseurl))
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Signup/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/verify' element={<VerifyMail/>}/>
        <Route element={<Protectedroute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chat' element={<Chat socketref={socketref}/>}/>
        </Route>
      </Routes>
     
    </div>
  )
}

export default App