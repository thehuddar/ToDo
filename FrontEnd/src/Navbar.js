import { useEffect, useState } from 'react';
import { Container, Button, Form, Navbar, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
export default function Navgationbar(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(props.loggedIn){
            setIsLoggedIn(true)
        }
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand primary="primary"><Link to="/" >Task Management</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto fs-5">
                            <Nav.Link href="#features"></Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 input-primary bg-primary b-primary"
                                aria-label="Search"
                            />
                            <Button primary="primary">Search</Button>
                            {isLoggedIn && <Button primary="primary" onClick={handleLogout}>Logout</Button>}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}