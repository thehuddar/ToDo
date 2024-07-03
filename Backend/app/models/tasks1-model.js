const mongoose =  require('mongoose')

const {Schema, model} = mongoose
const taskSchema = new Schema({
    title:String, 
    description:String,
    status:String,
    priority:String,
    userId:Schema.Types.ObjectId
},{timestamps:true})

const Task1 = model('task1',taskSchema)

module.exports = Task1;