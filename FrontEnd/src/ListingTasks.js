import axios from "axios"
import TaskItem from "./TaskItem"
import { useState, useEffect } from "react"
import { isEmpty } from 'lodash'
import ModalTaskForm from "./ModalTaskForm"
import { Col, Image, } from 'react-bootstrap';
import nothing from "./Images/nothing.jpg"
export default function ListingTask(props) {

    const { tasks, tasksCopy, handleSorting, handleFilterByStatus, handleFilterByPriority } = props

    const [toggle, setToggle] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedTasks, setSelectedTasks] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [priorityValue, setPriorityValue] = useState('')
    const [statusValue, setStatusValue] = useState('')

    //search
    const filterTasks = tasks.filter((ele) => {
        return (ele.title.toLowerCase().includes(search.toLowerCase()))
    })

    //How can we use both filter together on High priority getting pending tasks?????
    //toGroupBy Based on Priority
    useEffect(() => {
        if (priorityValue === '') {
            handleFilterByPriority(tasksCopy)
        } else {
            const newArr = tasksCopy.filter((ele) => {
                return ele.priority === priorityValue
            })
            handleFilterByPriority(newArr)
        }
    }, [priorityValue])

    //toGroupBy Based on Status
    useEffect(() => {
        if (statusValue === '') {
            handleFilterByStatus(tasksCopy)
        } else {
            const newArr = tasksCopy.filter((ele) => {
                return ele.status === statusValue
            })
            if (newArr.length === 0) {
                handleFilterByStatus(tasksCopy)
                alert(`No Tasks With ${statusValue} status`)
            } else {
                handleFilterByStatus(newArr)
            }
        }
    }, [statusValue])

    //tohandleSort
    const handleSort = () => {
        if (toggle) {
            setToggle(false)
            handleSorting(tasksCopy)
        } else {
            setToggle(true)
            const newArr = tasks.map((ele) => {
                ele.priority = ele.priority === 'High' ? 3 : (ele.priority === 'Medium' ? 2 : 1)
                return ele
            })
            newArr.sort((a, b) => a.priority - b.priority)
            const newarray = newArr.reverse().map((ele) => {
                ele.priority = ele.priority === 3 ? 'High' : (ele.priority === 2 ? 'Medium' : 'Low')
                return ele
            })
            handleSorting(newarray)
        }
    }


    const handleDeleteMany = (id) => {
        if (selectedTasks.includes(id)) {
            const newArr = selectedTasks.filter((ele) => {
                return ele !== id
            })
            setSelectedTasks(newArr)
        } else {
            const newArr = [...selectedTasks, id]
            setSelectedTasks(newArr)
        }
    }

    const handleDeleteManyTasks = () => {
        if (!isEmpty(selectedTasks)) {
            const confirm = window.confirm('Are you sure want to delete?')
            if (confirm) {
                axios.delete(`http://localhost:3080/api/users/tasks?id=${selectedTasks.join(', ')}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                    .then((response) => {
                        props.deleteMany(selectedTasks, response.data.acknowledged)
                        setSelectedTasks([])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        } else {
            window.alert('Select a task to delete..')
        }
    }

    return (
        <>
            <div className="m-2">
                <ModalTaskForm addTask={props.addTask} />
            </div>
            {tasks.length > 0 ?
                <>
                    <h2 className="m-2 form-check-inline">Listing Tasks - {filterTasks.length} </h2>
                    <div className="mb-2">
                        <div className="form-check-inline mx-4 ">
                            <input className="form-control" type="text" id="search" placeholder="search title..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        {/* <div className="form-check form-check-inline mx-4">
                            <label className="form-check-label" htmlFor="selectPriority">Group By:</label>
                            <select value={priorityValue} onChange={(e) => setPriorityValue(e.target.value)} id="selectPriority">
                                <option value="">Select Priority</option>
                                {
                                    ['Low', 'Medium', 'High'].map((ele, i) => {
                                        return <option value={ele} key={i}>{ele}</option>
                                    })
                                }
                            </select>
                        </div> */}
                        <div className="form-check form-check-inline mx-4">
                            <label className="form-check-label" htmlFor="selectPriority">Group By:</label>
                            <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)} id="selectPriority">
                                <option value="">Select Status</option>
                                {
                                    ['Pending', 'InProgress', 'Completed'].map((ele, i) => {
                                        return <option value={ele} key={i}>{ele}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-check form-check-inline mx-4">
                            <input className="form-check-input" type="checkbox" role="switch" id="switch1" onChange={handleSort} />
                            <label className="form-check-label" htmlFor="switch1">Sort High to Low Priority</label>
                        </div>
                        <button onClick={handleDeleteManyTasks} className="btn btn-danger">Delete Selected</button>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col'></th>
                                <th scope="col">S.No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTasks.map((ele, i) => {
                                return (
                                    <TaskItem
                                        key={ele._id}
                                        ele={ele}
                                        i={i}
                                        editTask={props.editTask}
                                        deleteTask={props.deleteTask}
                                        tohandleEdit={props.tohandleEdit}
                                        checkAll={checkAll}
                                        handleDeleteMany={handleDeleteMany}
                                    />
                                )
                            })
                            }
                        </tbody>
                    </table>
                </> : <div style={{ "marginLeft": "25vw" }}>
                    <h2 className="m-2 ">No Tasks to Display, Add a new Task</h2>
                    <Col>
                        <Image src={nothing} fluid style={{ height: '120vh', objectFit: 'cover' }} />
                    </Col></div>}
        </>
    )
}