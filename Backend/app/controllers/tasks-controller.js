const { validationResult } = require('express-validator')
const Task = require('../models/tasks-model')

const taskCntrler = {}

taskCntrler.list = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        alert(err.message)
    }
}

taskCntrler.listSingle = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        res.json(task)
    } catch (err) {
        alert(err.message)
    }
}

taskCntrler.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const t1 = new Task(body)
    try {
        const task = await t1.save()
        res.json(task)
    } catch (err) {
        alert(err.message)
    }
}

taskCntrler.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const id = req.params.id
    Task.findByIdAndUpdate(id, body, { new: true })
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

taskCntrler.destroy = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        res.json(task)
    } catch (err) {
        alert(err.message)
    }
}

taskCntrler.destroyMany = async (req, res) => {
    const id = req.query.id
    const tasksId = id.split(', ')
    try {
        const tasks = await Task.deleteMany({ _id: [...tasksId] }) //tasksId items are passed as list of items by using spread operator
        res.json(tasks)
    } catch (err) {
        alert(err.message)
    }
}

module.exports = taskCntrler
