import React, { useEffect, useState } from "react"
import { Form, Button, Stack, Spinner } from "react-bootstrap";


const EditProfileForm = ({ user, onSave, onCancel, isUpdating, showChangePasswordForm }) => {
    const [formData, setFormData] = useState({
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      address: user.address,
      email: user.email,
    //   jobTitle: user.jobTitle,
    //   bio: user.bio
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSave({ ...user, ...formData });
      onCancel();
    };

    return (
        <>
        {
            !showChangePasswordForm && (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label htmlFor="username">Username:</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="firstName">First Name:</Form.Label>
                <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="address">Location:</Form.Label>
                <Form.Control
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="email">E-mail:</Form.Label>
                <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                </Form.Group>
                {/* <Form.Group>
                <Form.Label htmlFor="bio">Bio:</Form.Label>
                <Form.Control
                    as="textarea"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                />
                </Form.Group> */}
                <Stack gap={2} className="col mt-2 mb-5 mx-auto">
                {
                    isUpdating ? (
                        <><Button variant="primary" disabled>
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="false"
                            />
                            <span> Saving...</span>
                        </Button>
                        <Button type="button" variant="outline-secondary" onClick={onCancel} disabled>Cancel</Button></>
                    ) : (
                        <><Button type="submit" variant="primary">Save changes</Button>
                        <Button type="button" variant="outline-secondary" onClick={onCancel}>Cancel</Button></>
                    )
                }
                </Stack>
            </Form>)
        }
    </>
    );
  };

  export default EditProfileForm;