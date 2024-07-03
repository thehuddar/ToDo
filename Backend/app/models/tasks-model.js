const mongoose =  require('mongoose')

const {Schema, model} = mongoose
const taskSchema = new Schema({
    title:String, 
    description:String,
    status:String,
    priority:String
},{timestamps:true})

const Task = model('task',taskSchema)

module.exports = Task;