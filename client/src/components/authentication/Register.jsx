import React, { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import "./login.css"

const Registration = ({ setAuth }) => {
    const [ state, setState ] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newState = {
            username: e.target.username.value,
            password: e.target.password.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            gender: e.target.gender.value,
            address: e.target.address.value,
            user_type: e.target.user_type.value,
        }
        setState(newState)
        // console.log(newState)

        const response = await fetch (
            "http://localhost:8000/register", {
                method: "POST", 
                headers: {"Content-type": "application/json"}, 
                body: JSON.stringify(newState)
            }
        )
        const parseRes = await response.json()
        // console.log(parseRes)
        console.log(state)
        
        if(parseRes.token) {
            //localstorage
            localStorage.setItem("token", parseRes.token)
            setAuth(true)
            toast.success("Registration Successful")
            console.log("Registration Successful")
        } else {
            setAuth(false)
            toast.error(parseRes)
            console.log("Something wrong")
        }

        } catch (error) {
            console.log(error.message)
        }
        e.target.reset() 
    }
    
    return (
        <header>
        <section>
        <div className="container px-5 text-center div_main">
            <h3 className="h3 mt-1 mb-3 pt-5 fw-normal">Create an account</h3>
    	<form onSubmit={handleSubmit} className="pt-5">
            
        <div className="input-group mb-3">
            <span className="input-group-text ">Register as a:</span>
            <select name="user_type">
                <option value="Sponsor">Sponsor</option>
                <option value="Planter">Planter</option>
            </select>
            </div>
            <br />
            
                <div className="input-group mb-3">
                {/* username */}
                <span className="input-group-text ">Username:</span>
                <input name="username" className="form-control"/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">Password:</span>
                <input name="password" type="password" className="form-control"/>
                </div>
            <br />
                {/* fullname */}
                <div className="input-group mb-3">
                <span className="input-group-text">First Name:</span>
                <input name="firstname" className="form-control"/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">Last Name:</span>
                <input name="lastname" className="form-control"/>
                </div>
            <br />
            <div className="row">
            <div className="input-group mb-3 col">
                <span className="input-group-text">E-mail:</span>
                <input name="email" className="form-control"/>
                </div>
                <br />
                <div className="input-group mb-3 col">
                <span className="input-group-text">Gender:</span>
                <select name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>
                </div>
            <br />
            <div className="input-group mb-3">
            <span className="input-group-text">Address:</span>
            <input name="address" className="form-control"/>
            </div>
            <br />  
            <input type="submit" value="Register" className="btn btn-primary"/>
        </form>
        <h5>Already have an account?</h5>
        <Link to="/login" className="btn btn-outline-success">Login Here</Link>
        </div>
        </section>
        </header>
    )
}

export default Registration