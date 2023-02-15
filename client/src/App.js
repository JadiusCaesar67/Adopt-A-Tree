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
import Modal from 'react-bootstrap/Modal';

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ id, setId ] = useState("")
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  };
  //Login modal
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleClose = () => setShowLoginForm(false);
  const handleShow = () => setShowLoginForm(true);

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
      parseRes === true ? 
      setIsAuthenticated(true)
      :
      setIsAuthenticated(false);
    }
    catch (err){
      // console.error(err.message)
    }
  }

  const getOwnId = async () => {
    // console.log(localStorage.getItem("token"))
    try {
        const response = await fetch(
            "http://localhost:8000/users/ownId", 
            {
                method: "GET", 
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
        const parseRes = await response.json()
        setId(parseRes)
        // console.log(id)
          }catch (error) {
            console.error(error.message)
        }
    }
  useEffect( () => {
    checkAuthenticated();
    getOwnId();
  }, []);

  return (
    //router to redirect and check authentication
    <div className="App">
      <Router>
        <Headers isAuth={isAuthenticated} setAuth={setAuth} showLogin={handleShow} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={!isAuthenticated ? (<Registration setAuth={setAuth}/> ): (
              <Navigate to='/profile'/>
            ) }></Route>
            <Route exact path="/timeline" element={<Timeline id={id} showLogin={handleShow} isAuthenticated={isAuthenticated}/>} />
            {/* <Route exact path='/timeline' element={isAuthenticated ? (<Timeline id={id}/> ): (
              handleShow
            ) }></Route> */}
            <Route exact path='/messenger' element={isAuthenticated ? (<Messenger /> ): (
              <Navigate to='/login'/>
            ) }></Route>
            {/* <Route exact path='/profile' element={isAuthenticated ? (<Profile setAuth={setAuth}/> ): (
              <Navigate to='/login'/>
            ) }></Route> */}
            {/* <Route exact path="/messenger" element={<Messenger/>} /> */}
            <Route exact path='/profile' element={<Profile setAuth={setAuth}/>} />
            <Route path="*" element={<Test />} />
          </Routes>
        </div>
      </Router>
      <Modal show={showLoginForm} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton />
          <Login setAuth={setAuth} setShowLoginForm={setShowLoginForm}/>
        </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
