import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Logo from "../../assets/adopt-a-tree-logo-img.png"
import AvatarHeaders from "./AvatarHeaders";
import { toast } from 'react-toastify';

const Headers = ({ isAuth, setAuth, showLogin }) => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault()
    try {
        //removing the token from localstorage
        toast.warning("You've been logged out")
        localStorage.removeItem('token')
        setAuth(false)
        // window.location.reload(false)
        navigate('/');

    } catch (error) {
        console.log(error.message)
    }
  }
  
  return (
    <nav>
      <header className="p-3 border-bottom headerbackground">
        <div className="container ">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={Logo} alt="logo" width={75} height={60} className="rounded-circle" />
            </a>
            <ul id="header_nav" className="nav col-lg-auto me-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="button_headers px-2 rounded-pill">Home</a></li>
              <li><a href="/timeline" className="button_headers px-2">Timeline</a></li>
              <li><a href="/" className="button_headers px-2">Help</a></li>
            </ul>
            {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-5">
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </form> */}
            <div className="dropdown text-end">
              <a href="/" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <img src={profilePic} alt="mdo" width="30" height="24" className="rounded-circle profile_icon_pic" /> */}
              <AvatarHeaders isAuth={isAuth}/>
              </a>
              {/* <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1"> */}
                {/* <hr className="dropdown-divider"/> */}
                {/* <a className="dropdown-item" href="/profile">Profile</a> */}
                  {
                  isAuth ? (
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                      <a className="dropdown-item" href="/profile">Profile</a>
                      <a className="dropdown-item" href="/messenger">Messenger</a>
                      <a className="dropdown-item" href="*" onClick={logout}>Logout</a>
                    </ul>
                  )
                  :
                  (
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                      <button className="dropdown-item" variant="primary" onClick={showLogin}>Login</button>
                    </ul>
                  )
                }
                
            </div>
          </div>
        </div>
      </header>

      </nav>
  )
}

export default Headers;