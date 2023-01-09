import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import "./index.css";
import './pages/home/headers.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"
import Test from './components/Nothing';
import Home from './pages/home/Home'; 
import Registration from './components/authentication/Register';
import Login from './components/authentication/Login';
import Profile from './pages/profile/Profile';
import Messenger from "./pages/messenger/Messenger";
import Timeline from "./pages/timeline/Timeline";
import Headers from "./components/headings/Headers";

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ id, setId ] = useState("")
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:8000/verify", 
      {
        method: "GET",
        headers: { 
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
    
      const parseRes = await response.json()

      // console.log(parseRes)
      parseRes === true ? 
      setIsAuthenticated(true)
      :
      setIsAuthenticated(false)
    }
    catch (err){
      // console.error(err.message)
    }
  }

  const getProfile = async () => {
    // console.log(localStorage.getItem("token"))
    try {
        const response = await fetch(
            "http://localhost:8000/profile", 
            {
                method: "GET", 
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
        const parseRes = await response.json()
        setId(parseRes.id)
        // console.log(id)
          }catch (error) {
            console.log("something went wrong")
        }
    }
  useEffect( () => {
    checkAuthenticated();
    getProfile();
  }, []);

  return (
    //router to redirect and check authentication
    <div className="App">
      <Headers isAuth={isAuthenticated} setAuth={setAuth}/>
      <Router>
        <div >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
              <Navigate to='/timeline'/>
            ) } ></Route>
            <Route exact path='/register' element={!isAuthenticated ? (<Registration setAuth={setAuth}/> ): (
              <Navigate to='/timeline'/>
            ) }></Route>
            <Route exact path='/timeline' element={isAuthenticated ? (<Timeline id={id}/> ): (
              <Navigate to='/login'/>
            ) }></Route>
            {/* <Route exact path='/messenger' element={isAuthenticated ? (<Messenger /> ): (
              <Navigate to='/login'/>
            ) }></Route>
            <Route exact path='/profile' element={isAuthenticated ? (<Profile /> ): (
              <Navigate to='/login'/>
            ) }></Route> */}
            <Route exact path="/messenger" element={<Messenger/>} />
            <Route exact path='/profile' element={<Profile />} />
            <Route path="*" element={<Test />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
