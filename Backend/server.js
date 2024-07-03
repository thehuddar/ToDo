require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { checkSchema, validationResult } = require('express-validator')
const port = 3080

//application level middleware 
app.use(express.json())
app.use(cors())

//db connection
const configureDB = require('./config/db')
configureDB()

//expressValidationSchema 
const taskValidationSchema = require('./app/validations/task-validation') 
const {userRegisterValidationSchema, userLoginValidationSchema} = require('./app/validations/users-validation')

//import controllers
const adminCntrl = require("./app/controllers/admin-controllers")
const userCntrl = require('./app/controllers/userCntrl')
const taskCntrler = require('./app/controllers/tasks-controller')
const taskCntrler1 = require("./app/controllers/tasks1-controller")

//importing authenticateUser
const {authenticateUser, authorizeUser} = require('./app/middleware/auth')

//for Admin
app.post('/api/admin/login', adminCntrl.login)
app.get('/api/admin/userslist', authenticateUser, authorizeUser(['admin']),adminCntrl.userlists)

//for users
app.post('/api/users/register', checkSchema(userRegisterValidationSchema), userCntrl.register)
app.post('/api/users/emailVerification', userCntrl.verifyEmail)
app.post('/api/users/login', checkSchema(userLoginValidationSchema), userCntrl.usersLogin)

app.post('/api/users/task', authenticateUser, authorizeUser(['user']), checkSchema(taskValidationSchema), taskCntrler1.create)
app.get('/api/users/task', authenticateUser, authorizeUser(['user']), taskCntrler1.lists)
app.put('/api/users/task/:id',authenticateUser, authorizeUser(['user']), checkSchema(taskValidationSchema), taskCntrler1.update)
app.delete('/api/users/task/:id', authenticateUser, authorizeUser(['user']), taskCntrler1.destroy)
app.delete('/api/users/tasks', authenticateUser, authorizeUser(['user']), taskCntrler1.destroyMany)
//-----------------------------------------------------

//Create a task
// app.post('/api/tasks', checkSchema(taskValidationSchema), taskCntrler.create)

// //to get all tasks
// app.get('/api/tasks', taskCntrler.list)

// //to get a particular task
// app.get('/api/tasks/:id', taskCntrler.listSingle)

// //to update a task
// app.put('/api/tasks/:id', checkSchema(taskValidationSchema), taskCntrler.update)

// //to delete a task
// app.delete('/api/tasks/:id', taskCntrler.destroy)

// //to delete multiple
// app.delete('/api/tasks', taskCntrler.destroyMany)

//Server listening on Port 3080
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
