import React, {  useState, useEffect  } from "react";
import { toast } from 'react-toastify';
import './login.css'
const Login = ({ setAuth, setShowLoginForm }) => {
    const [ inputs, setInputs ] = useState ({
        username: "",
        password: "",
        rememberMe: false, // added rememberMe field to component state
    })
    
    // set the state of the checkbox when the component loads
    useEffect(() => {
        const rememberMe = localStorage.getItem("rememberMe") === "true";
        setInputs(inputs => ({ ...inputs, rememberMe }));
    }, []);

    // update the state of the checkbox when it is clicked
    const onRememberMeChange = e => {
        const rememberMe = e.target.checked;
        setInputs(inputs => ({ ...inputs, rememberMe }));
        localStorage.setItem("rememberMe", rememberMe); // store the state in localStorage
    };

    //setting the inputs so that all previous input would be brought up
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name] : e.target.value})
    }

    //define the username and password variable from the inputs
    const { username, password, rememberMe } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            //for making the body object from the username and password
            const body = { username, password }
            // console.log(body)
            // console.log(JSON.stringify(body))
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()
            // console.log(parseRes)
                
        if (parseRes.token) {
            //for in local storage
            setShowLoginForm(false)
            localStorage.setItem("token", parseRes.token)
            setAuth(true)
            toast.success("Login Successful")
        }
        else {
            setAuth(false)
            toast.error(parseRes)
            // console.log("Something went wrong or wrong credentials")
        }
        }
        catch (error) {
            toast.error("Password or Username is Incorrect")
            console.error(error.message)
            }
    }

return (
    
    <div className="div_main text-center mb-5">
        <h3 className="h3 mt-1 mb-3 pt-5 fw-normal">Login</h3>
        <div className="form-signin">
        <form onSubmit={onSubmitForm}>

            <div className="form-floating mb-4">
                    <input 
                    type="text" 
                    id="usernameForm" 
                    name="username" 
                    className="form-control" 
                    placeholder="name_123 or name@example.com"
                    value={username} 
                    onChange={e => onChange(e)} />
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                </div>


                <div className="form-floating mb-4">
                    <input 
                    type="password" 
                    id="passwordForm" 
                    name="password" 
                    className="form-control"
                    placeholder="Password"
                    value={password} 
                    onChange={e => onChange(e)} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>

             {/* "Remember me" checkbox */}
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox"
                            checked={rememberMe}
                            onChange={onRememberMeChange}
                        /> 
                        Remember me
                </label>
            </div>
            
            <button type="submit" className="btn btn-primary btn-success mb-4" >Login</button>

            

        </form>
    <h5 className="h5 mb-3 fw-normal">Don't have an account yet?</h5>
    <a href="/register" className="btn btn-outline-success">Register Here</a>
    </div>
    </div>
)
}
export default Login;