import React from 'react'
import NavBar from './../NavBar/NavBar.jsx';
import Footer from './../Footer/Footer.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
export default function Layout({setUserData ,userData}) {
 
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

  return (
    <div className='pt-5 mt-5'>
      <NavBar logOut={logOut} userData = {userData}/>
      <div className="container">
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
