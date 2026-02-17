import React from 'react'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import VerifyMail from './components/VerifyMail'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<VerifyMail/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
     
    </div>
  )
}

export default App