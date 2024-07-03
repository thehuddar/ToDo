import { useState, useEffect } from "react"
// import TaskForm from "./TaskForm"
import Navgationbar from "./Navbar"
import ListingTasks from './ListingTasks'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Tasks(){
    const [tasks, setTasks] = useState([])
    const [tasksCopy, setTasksCopy] = useState([])
    const navigate = useNavigate()

    //useEffect hook to get data initially
    useEffect(() => {
        localStorage.getItem('token') ? 
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:3080/api/users/task`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                setTasks(response.data)
                setTasksCopy(response.data)
            }catch(err){
                alert(err.message)
            }
        })()
        : navigate("/")
    }, [])

    //toAddTask
    const addTask = (task)=>{
        setTasks([...tasks, task])
        setTasksCopy([...tasksCopy, task])
    }

    //toHandleSorting
    const handleSorting = (arr)=>{
        setTasks(arr)
    }

    //toDeleteTask
    const deleteTask = (id)=>{
        const newArr = tasks.filter((ele) => {
            return ele._id !== id
        })
        setTasks(newArr)
        setTasksCopy(newArr)
    }

    //toEditTask
    const editTask = (result)=>{
        const newArr = tasks.map((ele) => {
            if (ele._id === result._id) {
                return result
            } else {
                return ele
            }
        })
        setTasks(newArr)
        setTasksCopy(newArr)
    }


    //to delet many
    const deleteMany = (selectedTasks)=>{
        const newArr = tasks.filter((ele)=>{
            return !selectedTasks.includes(ele._id)
        })
        setTasks(newArr)
        setTasksCopy(newArr)
    }

    //handleFilterByStatus
    const handleFilterByStatus = (arr)=>{
        setTasks(arr)
    }

    //handleFilterByPriority
    const handleFilterByPriority = (arr)=> {
        setTasks(arr)
    }

    return (
        <>
            <Navgationbar loggedIn={true}/>
            <ListingTasks 
                tasks={tasks} 
                tasksCopy={tasksCopy} 
                handleSorting={handleSorting} 
                editTask = {editTask}
                deleteTask = {deleteTask}
                deleteMany ={deleteMany}
                handleFilterByStatus={handleFilterByStatus}
                handleFilterByPriority={handleFilterByPriority}
                addTask = {addTask}/>
            {/* <TaskForm addTask = {addTask} edit={edit}  tasks={tasks}/> */}
        </>
    )
}