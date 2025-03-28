import React from "react"
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Issue from "./pages/Issue"
import View from "./pages/View"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/login"/>}/>   
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/issue' element={<Issue/>}/>
        <Route path='/home' element={<View/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
