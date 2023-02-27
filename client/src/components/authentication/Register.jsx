import React, { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import "./login.css"

const Registration = ({ setAuth }) => {
    // const [ state, setState ] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newState = {
            username: e.target.username.value,
            password: e.target.password.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            gender: e.target.gender.value,
            address: e.target.address.value
        }
        // setState(newState)
        console.log(newState)

        // const response = await fetch (
        //     "http://localhost:8000/register", {
        //         method: "POST", 
        //         headers: {"Content-type": "application/json"}, 
        //         body: JSON.stringify(newState)
        //     }
        // )
        // const parseRes = await response.json()
        // // console.log(parseRes)
        // console.log(parseRes)
        
        // if(parseRes.token) {
        //     //localStorage
        //     localStorage.setItem("token", parseRes.token)
        //     setAuth(true)
        //     toast.success("Registration Successful")
        //     console.log("Registration Successful")
        // } else {
        //     setAuth(false)
        //     toast.error("Registration Failed")
        //     console.log("Something wrong")
        // }

        } catch (error) {
            console.log(error.message)
        }
        // e.target.reset() 
    }
    
    return (
        <header>
        <section>
        <div className="container px-5 text-center div_main">
            <h3 className="h3 mt-1 mb-3 pt-5 fw-normal">Create an account</h3>
    	<form onSubmit={handleSubmit} className="pt-5 needs-validation" noValidate>
                <div className="input-group mb-3">
                {/* username */}
                    <label htmlFor="validationUsername" className="input-group-text ">Username:</label>
                    <input name="username" className="form-control" id="validationUsername" required/>
                    <div className="invalid-feedback">
                        Username is required.
                    </div>
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="validationPassword" className="input-group-text">Password:</label>
                    <input name="password" type="password" className="form-control" id="validationPassword" required/>
                    <div className="invalid-feedback">
                        Please fill in password.
                    </div>
                </div>
            <br />
                {/* fullName */}
                <div className="input-group mb-3">
                <label htmlFor="validationFirstName" className="input-group-text">First Name:</label>
                <input name="firstName" className="form-control" id="validationFirstName" required/>
                <div className="invalid-feedback">
                    First name is required.
                </div>
                </div>
                <div className="input-group mb-3">
                <label htmlFor="validationLastName" className="input-group-text">Last Name:</label>
                <input name="lastName" className="form-control" id="validationLastName" required/>
                <div className="invalid-feedback">
                    Last name is required.
                </div>
                </div>
            <br />
            <div className="row">
            <div className="input-group mb-3 col">
                <label htmlFor="validationEmail" className="input-group-text">E-mail:</label>
                <input name="email" className="form-control" id="validationEmail" required/>
                <div className="invalid-feedback">
                    Please type in your e-mail.
                </div>
                </div>
                <br />
                <div className="input-group mb-3 col">
                <label htmlFor="validationGender" className="input-group-text">Gender:</label>
                <select id="validationGender" name="gender" required>
                    <option defaultValue="Choose..."></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <div className="invalid-feedback">
                    Please choose a gender.
                </div>
                </div>
                </div>
            <br />
            <div className="input-group mb-3">
            <label htmlFor="validationAddress" className="input-group-text">Address:</label>
            <input name="address" className="form-control" id="validationAddress" required/>
            <div className="invalid-feedback">
                    Please fill in address.
                </div>
            </div>
            <br />  
            <input type="submit" value="Register" className="btn btn-primary"/>
        </form>
        <h5>Already have an account?</h5>
        <Link to="/login" className="btn btn-outline-success mb-5">Login Here</Link>
        </div>
        </section>
        </header>
    )
}

export default Registration