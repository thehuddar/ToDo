const { validationResult } = require('express-validator')
const Task1 = require("../models/tasks1-model")

const taskCntrler1 = {}

taskCntrler1.create = async(req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    try{
        const {body} = req
        const task = new Task1(body)
        task.userId = req.user.id
        await task.save()
        res.status(201).json(task)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

taskCntrler1.lists = async(req, res)=>{
    try{
        const tasks = await Task1.find({userId:req.user.id})
        res.status(200).json(tasks)
    }catch(err){
        console.log(err)
        res.status(500).json({err:'Internal Server Error'})
    }
}


taskCntrler1.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const id = req.params.id
    Task1.findOneAndUpdate({_id:id, userId:req.user.id}, body, { new: true })
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

taskCntrler1.destroy = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task1.findOneAndDelete({_id:id, userId:req.user.id})
        res.json(task)
    } catch (err) {
        alert(err.message)
    }
}

taskCntrler1.destroyMany = async (req, res) => {
    const id = req.query.id
    const tasksId = id.split(', ')
    try {
        const tasks = await Task1.deleteMany({ _id: [...tasksId], userId:req.user.id }) //tasksId items are passed as list of items by using spread operator
        res.json(tasks)
    } catch (err) {
        alert(err.message)
    }
}

module.exports = taskCntrler1;