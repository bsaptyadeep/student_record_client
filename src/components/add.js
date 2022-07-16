import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './add.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
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
            Axios.post(url, data)
            .then(()=> {
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
                    <Form.Control type="email" onChange={handleChange} value={data.email} required name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter your First Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={data.firstName} required name="firstName" placeholder="Enter your First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter your Second Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={data.secondName} required name="secondName" placeholder="Enter your Second Name" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Detail
                </Button>
            </Form>
        </div>
    )
}

export default Add