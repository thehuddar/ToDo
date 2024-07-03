import { useState } from "react"
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function LogInform({ handleRendering }) {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const navigate = useNavigate()

    const errors = {}

    const validateErrors = () => {
        if (!formData.email) {
            errors.email = 'email is required'
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
                localStorage.removeItem('email')
                const response = await axios.post("http://localhost:3080/api/users/login", formData)
                
                localStorage.setItem("token", response.data.token)
                
                navigate("/tasks")

            } catch (err) {
                console.log(err)
                setServerErrors(err.response.data)
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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {formErrors.email && <div className="text-danger">**{formErrors.email}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange} />
                    {formErrors.password && <div className="text-danger">**{formErrors.password}</div>}
                </Form.Group>
                {
                    serverErrors.error && <div className="text-danger">**{serverErrors.error}</div>
                }
                <Button variant="primary" type="submit">
                    LogIn
                </Button> <br />
                <Form.Text className="text-primary">
                    <Link to="/register">New User! Register Here </Link>
                </Form.Text>
            </Form>
        </>
    )
}