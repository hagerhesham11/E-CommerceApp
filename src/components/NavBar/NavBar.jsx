import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../Context/CartContext'

export default function NavBar({userData ,logOut}) {
  let {numOfCartItems} = useContext(cartContext)
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">
      <img src={logo} alt="logo" width={110}/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
      </ul> : null}
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
      <li className="nav-item">
         
         <i className='fab mx-2 fa-instagram'></i>
         <i className='fab mx-2 fa-facebook'></i>
         <i className='fab mx-2 fa-tiktok'></i>
         <i className='fab mx-2 fa-twitter'></i>
         <i className='fab mx-2 fa-linkedin'></i>
         <i className='fab mx-2 fa-youtube'></i>
       </li>
       {userData === null ? <>
        <li className="nav-item">
         <Link className="nav-link" to="register">Register</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="login">Login</Link>
       </li>
       </> 
       : 
      <>
       <li className="nav-item position-relative">
       <Link className="nav-link px-2" to="carts"><i className='fas fa-shopping-cart fa-lg'></i> 
       <span className='badge position-absolute top-0 end-0 text-white bg-main'> {numOfCartItems}</span>
        </Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" onClick={logOut}>LogOut</Link>
     </li> 
       
      </>
      
       
       }
      
     
       
       
     
     </ul>
     
    </div>
  </div>
</nav>
    </div>
  )
}
