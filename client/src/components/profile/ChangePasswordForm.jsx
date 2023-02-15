import React, { useEffect, useState } from "react"
import { Form, Button, Stack } from "react-bootstrap";


const ChangePasswordForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = React.useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSave(formData.currentPassword, formData.newPassword);
      onCancel();
    };
  
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="currentPassword">Current Password:</Form.Label>
          <Form.Control
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="newPassword">New Password:</Form.Label>
          <Form.Control
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Stack gap={2} className="col mt-2 mb-5 mx-auto">
            <Button type="submit" variant="primary">Save changes</Button>
            <Button type="button" variant="outline-secondary" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Form>
    );
  };

  export default ChangePasswordForm;