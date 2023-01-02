import React, { useState } from "react";
import Logo from "../assets/adopt-a-tree-logo-img.png"
import AvatarHeaders from "./AvatarHeaders";
const Headers = ({ isAuth, setAuth }) => {

  // const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  // const setAuth = boolean => {
  //   console.log(isAuthenticated, boolean)
  //   setIsAuthenticated(boolean)
  // };

  // const checkAuthenticated = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/verify", 
  //     {
  //       method: "GET",
  //       headers: { 
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       }
  //     });

  //     const parseRes = await response.json()

  //     // console.log(parseRes)
  //     parseRes === true ? 
  //     setIsAuthenticated(true)
  //     :
  //     setIsAuthenticated(false);
  //   }
  //   catch (err){
  //     console.log(err.message);
  //   }
  // }

  // useEffect( () => {
  //   checkAuthenticated();
  // }, []);

  const logout = async (e) => {
    window.location.reload(false)
    e.preventDefault()
    try {
        //removing the token from localstorage
        localStorage.removeItem('token')
        setAuth(false)

    } catch (error) {
        console.log(error.message)
    }
  }

    return (
<header className="p-3 border-bottom headerbackground">
        <div className="container ">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={Logo} alt="logo" width={75} height={60} className="rounded-circle" />
            </a>
            <ul id="header_nav" className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="button_headers px-2 rounded-pill">Home</a></li>
              <li><a href="/timeline" className="button_headers px-2">Timeline</a></li>
              <li><a href="/" className="button_headers px-2">Help</a></li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-5">
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </form>

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
                      <a className="dropdown-item" href="*" onClick={logout}>Sign out</a>
                    </ul>
                  )
                  :
                  (
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                      <a className="dropdown-item" href="/login" >Sign in</a>
                    </ul>
                  )
                }
                
              {/* </ul> */}
            </div>
          </div>
        </div>
      </header>
   
    )
}

export default Headers;