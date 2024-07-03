import { useState } from "react"
import axios from "axios"
import { isEmpty } from 'lodash'

export default function TaskForm({ addTask, edit, tasks }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [serverError, setServerError] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validateErrors = () => {
        if (title.trim().length === 0) {
            errors.title = 'Title is required'
        }
        if (description.trim().length === 0) {
            errors.description = 'Description is required'
        }
        if (status.trim().length === 0) {
            errors.status = 'Status is required'
        }
        if (priority.trim().length === 0) {
            errors.priority = 'Priority is required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title,
            description,
            status,
            priority
        }
        validateErrors()
        if (isEmpty(errors)) {
            axios.post('http://localhost:3080/api/tasks', formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then((response) => {
                    const result = response.data
                    addTask(result)
                    setTitle('')
                    setDescription('')
                    setPriority('')
                    setStatus('')
                    setServerError({})
                    setFormErrors({})
                })
                .catch((err) => {
                    setServerError(err)
                })
        } else {
            setFormErrors(errors)
        }

    }

    return (
        <>
            <h2 className="m-2 ">Add Task</h2>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="m-3 col-md-4" >
                    <label className="mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control border-black"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    {formErrors.title && <span className="text-danger">**{formErrors.title}</span>}
                </div>
                {/* Description Field */}
                <div className="m-3 col-md-4">
                    <label className="mb-2" htmlFor="description">Description</label>
                    <textarea
                        className="form-control border-black"
                        rows="3"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    {formErrors.description && <span className="text-danger">**{formErrors.description}</span>}
                </div>
                {/* Priority Field */}
                <div className="m-3 col-md-4">
                    <label className="mb-2" htmlFor="priority">Priority</label>
                    <select value={priority} className="form-select border-black" aria-label="Default select example" onChange={(e) => setPriority(e.target.value)}>
                        <option value=''>Select Priority</option>
                        {
                            ["Low", "Medium", "High"].map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>{ele}</option>
                                )
                            })
                        }
                    </select>
                    {formErrors.priority && <span className="text-danger">**{formErrors.priority}</span>}
                </div>
                {/* Status Field */}
                <div className="m-3 col-md-4">
                    <label className="mb-2" htmlFor="status">Status</label>
                    <select value={status} className="form-select border-black" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                        <option value=''>Select Status</option>
                        {
                            ["Pending", "InProgress", "Completed"].map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>{ele}</option>
                                )
                            })
                        }
                    </select>
                    {formErrors.status && <span className="text-danger">**{formErrors.status}</span>}
                </div>
                {/* Handling Errors */}
                <div className="m-3 col-md-4">
                    {
                        Object.keys(serverError).length > 0 && (
                            serverError.response.data.errors.map((ele, i) => {
                                return <span key={i} className="text-danger">**{ele.msg} </span>
                            })
                        )
                    }
                </div>
                {/* Submit Button */}
                <div className="m-3 col-md-4">
                    <input type="submit" className="form-control border-black" />
                </div>
            </form>
        </>
    )
}