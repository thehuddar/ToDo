import bg from "./Images/bg.jpg"
import { Container, Row, Col, Image, Card, Form, Button } from 'react-bootstrap';
import Navgationbar from "./Navbar"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios"
export default function RegistartionForm() {
    const [formData, setFormData] = useState({ username: '', email: '', dateofbirth: '', gender: '', password: '' })
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    const navigate = useNavigate()

    const errors = {}

    const validateErrors = () => {
        if (!formData.username) {
            errors.username = 'username is required'
        }
        if (!formData.email) {
            errors.email = 'email is required'
        }
        if (!formData.dateofbirth) {
            errors.dateofbirth = 'dateofbirth is required'
        }
        if (!formData.gender) {
            errors.gender = 'gender is required'
        }
        if (!formData.password) {
            errors.password = 'password is required'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validateErrors()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            try {
                const response = await axios.post("http://localhost:3080/api/users/register", formData)
                {
                    localStorage.setItem("email", response.data.email)
                }
                navigate("/otp-page")
            } catch (err) {
                console.log(err)
                setServerErrors(err.response.data.errors)
            }
        } else {
            setFormErrors(errors)
        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <>
            < Navgationbar />
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <Image src={bg} fluid style={{ height: '100vh', objectFit: 'cover' }} />
                    </Col>
                    <Col xs={12} md={6} className='m-auto'>
                        <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                            <Card.Body>
                                <Card.Title > Registration Form </Card.Title> <hr />
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="Enter username"
                                            value={formData.username}
                                            name="username"
                                            onChange={handleChange} />
                                        {formErrors.username && <div className="text-danger">**{formErrors.username}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                            placeholder="Enter email"
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChange} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                            {formErrors.email && <div className="text-danger">**{formErrors.email}</div>}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control type="date"
                                            placeholder="Enter date of birth"
                                            value={formData.dateofbirth}
                                            name="dateofbirth"
                                            onChange={handleChange} />
                                        {formErrors.dateofbirth && <div className="text-danger">**{formErrors.dateofbirth}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Select Gender</Form.Label>
                                        <Form.Select aria-label="Default select example" value={formData.gender}
                                            name="gender" onChange={handleChange}>
                                            <option value=''>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </Form.Select>
                                        {formErrors.gender && <div className="text-danger">**{formErrors.gender}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password" placeholder="Password"
                                            value={formData.password}
                                            name="password"
                                            onChange={handleChange} />
                                        {formErrors.password && <div className="text-danger">**{formErrors.password}</div>}
                                    </Form.Group>
                                    {
                                        serverErrors.length > 0 && <>
                                            {
                                                serverErrors.map((ele) => {
                                                    return (<div className="text-danger">**{ele.msg}</div>)
                                                })
                                            }
                                        </>
                                    }
                                    <Button variant="primary" type="submit" >
                                        Register
                                    </Button> <br />
                                    <Form.Text className="text-primary">
                                        <Link to='/'>Already have an account? Login here</Link>
                                    </Form.Text>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}