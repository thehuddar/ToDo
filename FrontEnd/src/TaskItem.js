import axios from "axios"
import { useState } from "react"

export default function TaskItem({ ele, i, editTask, deleteTask, tohandleEdit, handleDeleteMany, checkAll }) {

    const [value, setValue] = useState(false)

    //toHandleDelete
    const handleDelete = async(obj) => {
        const confirm = window.confirm(`Are you Sure Want to Delete '${obj.title}'?`)
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3080/api/users/task/${obj._id}`, {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                deleteTask(response.data._id)
            } catch (err) {
                alert(err.message)
                console.log(err)
            }
        }
    }

    //toHandleEdit
    const handleEdit = async(obj) => {
        const input = window.prompt(`Enter the updated Status of ${obj.title}:[Completed, InProgress, Pending]`)
        if (input) {
            const newObj = { ...obj, status: input }
            try{
                const response = await axios.put(`http://localhost:3080/api/users/task/${obj._id}`,newObj, {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                editTask(response.data)
            }catch(err){
                console.log(err)
                alert(err.message)
            }
        }
    }

    //to handle color based on priority of task
    const handleStatus = (status) => {
        if (status === 'Pending') {
            return "table-danger"
        } else if (status === 'InProgress') {
            return "table-warning"
        } else {
            return "table-success"
        }
    }

    //handleCheck for checkboxes
    const handleCheck = (id) => {
        handleDeleteMany(id)
    }

    return (
        <>
            <tr className={handleStatus(ele.status)}>
                <td><input type="checkbox" checked={value} onChange={() => {
                    setValue(!value)
                    handleCheck(ele._id)
                }} /></td>
                <th scope="row">{i + 1}</th>
                <td>{ele.title}</td>
                <td>{ele.description}</td>
                <td>{ele.status}</td>
                <td>{ele.priority}</td>
                <td><button className="btn btn-warning" onClick={() => handleEdit(ele)}>Edit</button> <button className="btn btn-danger" onClick={() => handleDelete(ele)}>Delete</button></td>
            </tr>
        </>
    )
}