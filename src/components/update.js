import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./add.css"
import Axios from 'axios';
import { useLocation } from "react-router-dom";

function Update() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email, id } = state;
    const [data, setData] = useState({
        firstName: "",
        secondName: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const submit = (e) => {
        e.preventDefault();
        try {
            const url = "https://studentrecordserver.herokuapp.com/api/";
            const send = ({ ...data, email: email, id: id });
            Axios.put(url, send)
                .then(() => {
                    navigate('/');
                })
        }
        catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                alert(error.response.data.message);
            }
        }
    }

    return (
        <div className='add-form'>
            <h1>Add New Student details</h1>
            <Form className="add-f" onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} disabled="disabled" />
                    <Form.Text className="text-muted">
                        E-mail can't be changed
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re-enter your First Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={data.firstName} required name="firstName" placeholder="Enter your First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re-enter your Second Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={data.secondName} required name="secondName" placeholder="Enter your Second Name" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    )
}

export default Update