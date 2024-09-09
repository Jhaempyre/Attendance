import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home.jsx'
import SignUp from './Components/SignUp.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : '/',
        element :(
          <Login/>
        )
      },
      {
        path : '/signup',
        element :(
            <SignUp/>
        )
      },
      {
        path : '/dashboard',
        element :(
          
            <Dashboard/>
            
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
