import Navgationbar from "./Navbar"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Card, Form, Button } from 'react-bootstrap';
import otp from "./Images/otp.jpg"
import axios from "axios"
export default function OtpPage() {

    const [otpData, setOtp] = useState('')
    const [serverErrors, setServerErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            otp: otpData,
            email: localStorage.getItem("email")
        }
        try {
            const response = await axios.post('http://localhost:3080/api/users/emailVerification', formData)
            console.log(response.data)
            setServerErrors({})
            alert('email verified')
            navigate("/")
        } catch (err) {
            console.log(err)
            setServerErrors(err.response.data)
        }
    }

    return (
        <>
            < Navgationbar />
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <Image src={otp} fluid style={{ height: '100vh', objectFit: 'cover' }} />
                    </Col>
                    <Col xs={12} md={6} className='m-auto'>
                        <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                            <Card.Body>
                                <Card.Title > OTP-Verification </Card.Title> <hr />
                                {
                                    serverErrors.error && <div className="text-danger">**{serverErrors.error}</div>
                                }
                                <Form onSubmit={handleSubmit} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Enter OTP</Form.Label>
                                        <Form.Control type="number"
                                            value={otpData}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Verify
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}