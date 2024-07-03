import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useState } from 'react';

export default function ModalTaskForm({ addTask }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [serverError, setServerError] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validateErrors = () => {
        if (title.trim().length === 0) {
            errors.title = '**title is required'
        }
        if (description.trim().length === 0) {
            errors.description = '**description is required'
        }
        if (status.trim().length === 0) {
            errors.status = '**status is required'
        }
        if (priority.trim().length === 0) {
            errors.priority = '**priority is required'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title,
            description,
            status,
            priority
        }
        validateErrors()
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3080/api/users/task', formData, {
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                addTask(response.data)
                setTitle('')
                setDescription('')
                setPriority('')
                setStatus('')
                setServerError('')
                setModalShow('')
                setFormErrors({})
            } catch (err) {
                alert(err.message)
                setServerError(err)
            }
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)} size="lg">
                Add Task
            </Button>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Title</Form.Label>
                            <Form.Control
                                className='border-black'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text" />
                            <Form.Text className="text-danger">
                                {formErrors.title && <span>{formErrors.title}</span>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter Description</Form.Label>
                            <Form.Control
                                className='border-black'
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                            <Form.Text className="text-danger">
                                {formErrors.description && <span>{formErrors.description}</span>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="selectPriority">
                            <Form.Label>Select Priority</Form.Label>
                            <Form.Select aria-label="Default select example" value={priority} onChange={(e) => setPriority(e.target.value)} className='border-black'>
                                <option value=''>Select Priority</option>
                                {
                                    ["Low", "Medium", "High"].map((ele, i) => {
                                        return (
                                            <option key={i} value={ele}>{ele}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {formErrors.priority && <span>{formErrors.priority}</span>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="selectStatus">
                            <Form.Label value=''>Select Status</Form.Label>
                            <Form.Select aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)} className='border-black'>
                                <option value=''>Select Status</option>
                                {
                                    ["Pending", "InProgress", "Completed"].map((ele, i) => {
                                        return (
                                            <option key={i} value={ele}>{ele}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Text className="text-danger">
                                {formErrors.status && <span>{formErrors.status}</span>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            {
                                Object.keys(serverError).length > 0 && (
                                    serverError.response.data.errors.map((ele, i) => {
                                        return <span key={i} className="text-danger">**{ele.msg} </span>
                                    })
                                )
                            }
                        </Form.Text> <br />
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}