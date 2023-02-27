import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { Form, FloatingLabel, Button, Container, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import "./login.css"

import "./login.css"

const Registration = ({ setAuth }) => {
    // const [ inputs, setInputs ] = useState ({
    //     username: "",
    //     password: "",
    //     rememberMe: false, // added rememberMe field to component state
    // })
    const [gender, setGender] = useState('');
    const [validated, setValidated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatched, setIsPasswordMatched] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //show password
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    
    //Password matching
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    useEffect(() => {
        if (password === confirmPassword && password !== "") {
            setIsPasswordMatched(true);
          } else {
            setIsPasswordMatched(false);
          }
    }, [password, confirmPassword])
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else if (!isPasswordMatched) {
            toast.warning("Please check password confirmation")
        } else {
          try {
            setIsSubmitting(true);
            const newState = {
              firstName: form.firstName.value,
              lastName: form.lastName.value,
              username: form.username.value,
              password: password,
              email: form.email.value,
              gender: gender,
              address: form.address.value,
            };
    
            const response = await fetch("http://localhost:8000/register", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(newState),
            });
    
            const parseRes = await response.json();
    
            if (parseRes.token) {
              localStorage.setItem("token", parseRes.token);
              setAuth(true);
              toast.success(parseRes.message);
            } else {
              setAuth(false);
              toast.error(parseRes.message);
            }

            setIsSubmitting(false);
          } catch (error) {
            setIsSubmitting(false);
            console.error(error.message);
          }
        }
    
        setValidated(true);
      };
    
      return (
        <header>
          <section>
            <Container className="text-center py-5">
              <h3 className="mt-1 mb-3 pt-5 fw-normal">Create an account</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="validationFirstName">
                        <FloatingLabel
                                controlId="firstName"
                                label="First Name"
                                className="mb-3"
                            >
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            required
                        />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            First name is required.
                        </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="validationLastName">
                        <FloatingLabel
                                controlId="lastName"
                                label="Last Name"
                                className="mb-3"
                            >
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                required
                            />
                        </FloatingLabel>
                      <Form.Control.Feedback type="invalid">
                        Last name is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-4">
                  <Col md={6}>
                    <Form.Group controlId="validationUsername">
                      <FloatingLabel
                                controlId="username"
                                label="Username"
                                className="mb-3"
                            >
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          name="username"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Row>
                        <Form.Group controlId="password">
                            <InputGroup className="mb-3">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Button 
                                variant="outline-primary" 
                                onClick={toggleShowPassword}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            <Form.Control.Feedback type="invalid">
                                Please fill in password.
                            </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="validationConfirmPassword">
                                <InputGroup className="mb-3">
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    required
                                    isValid={isPasswordMatched}
                                    isInvalid={!isPasswordMatched}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={toggleShowConfirmPassword}
                                        >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </Button>
                                    {
                                        isPasswordMatched? 
                                        (<Form.Control.Feedback type="valid">
                                            Passwords matched.
                                        </Form.Control.Feedback>
                                        ) : (<Form.Control.Feedback type="invalid" tooltip>
                                            Passwords do not match.
                                        </Form.Control.Feedback>)
                                    }
                                </InputGroup>
                                </Form.Group>
                        </Row>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="validationCustomFirstName">
                    <FloatingLabel
                            controlId="email"
                            label="E-mail"
                            className="mb-3"
                        >
                      <Form.Control
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        required
                      />
                      </FloatingLabel>
                      <Form.Control.Feedback type="invalid">
                        E-mail is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
            </Row>
            <Col md={4}>
                  <Form.Group controlId="validationGender">
                    <Form.Select
                        required
                        isInvalid={validated && !gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                        <option defaultValue="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select a gender.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="validationAddress">
                                <FloatingLabel
                                        controlId="address"
                                        label="Address/Location"
                                        className="mb-3"
                                    >
                                    <Form.Control
                                        type="text"
                                        placeholder="Address/Location"
                                        name="address"
                                        required
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">
                                Address/Location is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                        {
                            isSubmitting? (
                                <Spinner animation="border" variant="primary" />
                            ) : ( 
                                <Button type="submit" className="btn btn-primary" value="Register">Register</Button> )
                        }
                        
                </Form>
                </Container>
                <div className="container px-5 text-center div_main">
                    <h5>Already have an account?</h5>
                    <Link to="/login" className="btn btn-outline-success mb-5">Login Here</Link>
                </div>
            </section>
        </header>

    )
}

export default Registration