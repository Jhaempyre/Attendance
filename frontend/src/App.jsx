import React from "react"
import { Outlet } from 'react-router-dom'
import NavBar from "./Components/NavBar"

function App() {

  return (

   <main>
    <NavBar/>
    <Outlet />
   </main>
  )
   
}

export default App