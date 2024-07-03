const mongoose = require('mongoose')

const configureDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/TaskManagementApp-2024')
        .then(()=>{
            console.log('Connected to DB')
        })
        .catch(()=>{
            console.log('Error in DB Connection')
        })
}

module.exports = configureDB