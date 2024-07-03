import bg from "./Images/bg.jpg"
import { Container, Row, Col, Image, Card, } from 'react-bootstrap';
import Navgationbar from "./Navbar"
import LogInform from "./loginForm";

export default function Home() {
    return (
        <>
        <Navgationbar />
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <Image src={bg} fluid style={{ height: '100vh', objectFit: 'cover' }} />
                    </Col>
                    <Col xs={12} md={6} className='m-auto'>
                        <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                            <Card.Body>
                                <Card.Title >LogIn Form </Card.Title> <hr />
                                    <LogInform/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}