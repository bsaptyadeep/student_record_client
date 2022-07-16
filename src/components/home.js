import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {

            const url = "https://studentrecordserver.herokuapp.com/api/";
            const { data: res } = await Axios.get(url);
            setStudents(res);
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

    const deleteStud = async (id) => {
        try {

            const url = "https://studentrecordserver.herokuapp.com/api/";
            const { data: res } = await Axios.delete(url,  { data: { _id: id } });
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

    useEffect(() => {
        setTimeout(() => {
            getStudents()
        }, 1000);
    })

    return (
        <div className="home">
            <h1 className='head'>Students List</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>E-mail</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th colSpan={2}>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length === 0 ?
                            <tr><td>No Student Added</td></tr>
                            :
                            students.map((stud, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{stud.email}</td>
                                        <td>{stud.firstName}</td>
                                        <td>{stud.secondName}</td>
                                        <td className='settings-td' colSpan={2}>
                                            <Button className='settings-btn' variant="danger" size="sm"
                                                onClick={() => {
                                                    deleteStud(stud._id)
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button className='settings-btn' variant="primary" size="sm"
                                                onClick={() => navigate('/update', { state: {id: stud._id ,email: stud.email} })}
                                            >
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                )

                            })
                    }

                </tbody>
            </Table>
            <Button className='add-btn' variant="light" size="lg"
                onClick={() => navigate('/add')}
            >Add Student +</Button>
        </div>
    )
}

export default Home