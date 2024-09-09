import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useInfoStore from '../Zustand/useInfoStore';
import useLogout from '../Hooks/useLogOut';


function NavBar() {
    const { authStats, logout } = useInfoStore();
    const navigate = useNavigate()
    const { performLogout, isLoading, error } = useLogout()
    const logoutUser = async(e)=>{
        e.preventDefault();
        await performLogout()
        navigate('/')
    }

  return (
    <div className="navbar bg-base-100" style={{backgroundColor:"#a0e646"}}>    
    <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={()=>{ClickHandler()}}>AttendEase</a>
  </div>
  {authStats ? (
            <div>        
            <button
              onClick={logoutUser}
              className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 ml-2"
              style={{width:"85px"}}
            >
              Logout
            </button>
            </div>
          ) : (
            <div>
              <Link
                to="/signup"
                className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 inline-block text-center mr-4"
              >
                Sign-up
              </Link>
              <Link
                to="/"
                className="bg-[#0B7EC1] text-white px-4 py-2 rounded-full w-24 inline-block text-center"
              >
                Login
              </Link>
            </div>
          )}
</div>
  )
}

export default NavBar